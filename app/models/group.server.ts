import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export type Group = {
    id: string;
    groupName: string;
    contactFrequency: number;
    color: string;
};

export async function getGroups() {
    return prisma.contactGroup.findMany();
}

export async function getGroup(id: string) {
    return prisma.contactGroup.findUnique({ where: { id } });
}

export async function insertGroup(group: any) {
    return prisma.contactGroup.create({ data: group });
}