import {Contact, PrismaClient} from '@prisma/client';
import cuid from 'cuid';

const prisma = new PrismaClient()


export async function getContacts(accountId:string, contactGroupId="") {
    if(contactGroupId === "") {
        return prisma.contact.findMany({
                where: {accountId},
                orderBy: {lastContacted: 'desc'},
            },
        );
    } else {
        return prisma.contact.findMany({where: {contactGroupId, accountId}});
    }
}

export async function getContact(id: string) {
    return prisma.contact.findUnique({ where: { id } });
}

export async function getFavorites(accountId: string) {
    return prisma.contact.findMany({ where: { accountId, isFavorite: true } });
}

export async function insertContact(contact: Contact) {
    console.log("contact.accountId", contact.accountId)

    if(contact.id === "") {
      contact.id = cuid();
      return prisma.contact.create({ data: contact });
    }
    else {
      return prisma.contact.update({ where: { id: contact.id }, data: contact });
    }
}

export async function getUpcomingContacts(accountId:string, contactGroupId="") {
    if (contactGroupId === "") {
        return prisma.contact.findMany({
            where: {
                accountId,
                contactGroupId,
                lastContacted: {
                    gt: new Date(),
                    lt: new Date(Date.now() + 12096e5) // 14 days = 12096e5 milliseconds
                }
            }
        });
    } else {
        return prisma.contact.findMany({
            where: {
                accountId,
                lastContacted: {
                    gt: new Date(),
                    lt: new Date(Date.now() + 12096e5) // 14 days = 12096e5 milliseconds
                }
            }
        });
    }
}