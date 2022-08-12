import { Contact, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


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

export async function insertContact(contact: any) {
    return prisma.contact.create({ data: contact });
}