import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function getAccounts() {
    return prisma.account.findMany();
}

export async function getAccountById(id:string) {
    return prisma.account.findUnique({ where: { id: id } });
}

export async function getAccountByEmail(email:string) {
    return prisma.account.findUnique({ where: { email: email } });
}

// export async function createAccount(account: object) {
//     return prisma.account.create({ data: account });
// }

