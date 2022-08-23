import { Account, PrismaClient } from '@prisma/client';

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

export async function findOrCreate(account: any) {

    // console.log("account", account)
    
    const hasAccount = await prisma.account.findUnique({ where: { email: account.emails[0].value } });

    // console.log("hasAccount", hasAccount)

    if(hasAccount) {
        console.log(hasAccount.id);
        // do something in the context I guess so that we can know the user details?
        return hasAccount;
    }

    else {
        const accountFormatted = {
            firstName: account.name.givenName,
            lastName: account.name.familyName,
            email: account.emails[0].value,
            type: 'default',
            provider: account.provider
        }
        console.log("accountFormatted", accountFormatted)

        await prisma.account.create({ data: accountFormatted })

        return accountFormatted as Account;
    }


}