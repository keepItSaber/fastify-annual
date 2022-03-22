import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';


const annualInput = {
    title: z.string(),
    description: z.string().optional(),
    authorId: z.number(),
    patrolId: z.number(),
    keywords: z.array(z.string())
}

const annualGenerated = {
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
}

const createAnnualSchema = z.object({
    ...annualInput,
});
const annualResponseSchema = z.object({
    ...annualInput,
    ...annualGenerated,
});


const annualsResponseSchema = z.array(annualResponseSchema);

export type CreateAnnualInput = z.infer<typeof createAnnualSchema>;

export const { schemas: annualSchemas, $ref } = buildJsonSchemas({
    createAnnualSchema,
    annualResponseSchema,
    annualsResponseSchema
})