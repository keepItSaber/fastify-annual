import { FastifyInstance } from 'fastify';
import { createAnnualHandler, getAnnualsHandler } from './annual.controller';
import { $ref } from './annual.schema';
async function annualRoutes(server: FastifyInstance) {
    server.post('/', {
        preHandler: [server.authenticate],
        schema: {
            body: $ref('createAnnualSchema'),
            response: {
                201: $ref('annualResponseSchema')
            }
        }
    }, createAnnualHandler);

    server.get('/', {
        schema: {
            response: {
                200: $ref('annualsResponseSchema')
            }
        }
    }, getAnnualsHandler);
}

export default annualRoutes;