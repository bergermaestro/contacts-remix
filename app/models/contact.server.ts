import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export type Contact = {
    firstName: string;
    lastName?: string;
    id: string;
    isFavorite: boolean;
    contactGroupId?: string;
  };

export async function getContacts() {
  return prisma.contact.findMany();
}

export async function getContactsByGroup(contactGroupId: string) {
  return prisma.contact.findMany({ where: { contactGroupId } });
}

export async function getContact(id: string) {
    return prisma.contact.findUnique({ where: { id } });
}

export async function getFavorites() {
    return prisma.contact.findMany({ where: { isFavorite: true } });
}