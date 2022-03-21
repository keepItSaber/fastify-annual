import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt from 'fastify-jwt';

import swagger from 'fastify-swagger';
import { withRefResolver } from 'fastify-zod';

import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";


export const server = Fastify();

declare module "fastify" {
    export interface FastifyInstance {
        authenticate: any
    }
}

server.register(fjwt, {
    secret: 'jfkldsajfkdlasjjewijf923jfpjfi3',
})

server.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        await req.jwtVerify();
    } catch (error) {
        return reply.send(error);
    }
});

server.get('/healthcheck', async () => {
    return { status: 'OK' };
});

async function main() {

    for (const schema of userSchemas) {
        server.addSchema(schema);
    }

    server.register(swagger, withRefResolver({
        routePrefix: '/docs',
        exposeRoute: true,
        staticCSP: true,
        openapi: {
            info: {
                title: 'Fastify Annual Work API',
                description: 'API for school project',
                version: '1.0.0'
            }
        }
    })
    );

    server.register(userRoutes, { prefix: 'api/users' });

    try {
        await server.listen(3000, '0.0.0.0');
        console.log('Server ready at http://localhost:3000');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();

