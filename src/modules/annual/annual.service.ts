import prisma from "../../utils/prisma";
import { CreateAnnualInput } from "./annual.schema";

export async function createAnnual(data: CreateAnnualInput & { authorId: number }) {
    return await prisma.annualWork.create({
        data: data
    });
}

export async function getAnnuals() {
    return await prisma.annualWork.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            keywords: true,
            createdAt: true,
            updatedAt: true,
            patrol: {
                select: {
                    id: true,
                    name: true,
                }
            },
            author: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    });
}