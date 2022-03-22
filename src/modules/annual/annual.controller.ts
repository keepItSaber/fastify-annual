import { FastifyRequest } from "fastify";
import { CreateAnnualInput } from "./annual.schema";

import { createAnnual, getAnnuals } from './annual.service';


export async function createAnnualHandler(request: FastifyRequest<{ Body: CreateAnnualInput }>) {
    const annual = await createAnnual({
        ...request.body,
        authorId: request.user.id,
    });

    return annual;
}

export async function getAnnualsHandler() {
    const annuals = await getAnnuals();

    return annuals;
}