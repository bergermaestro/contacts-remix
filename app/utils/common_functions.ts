import {Contact} from "@prisma/client";

export function alphabetizeContacts(array: Contact[]): { [key: string]: Contact[] } {
    const refactoredObject: { [key: string]: Contact[] } = {};
    array.forEach(item => {
        if (item.lastName) {
            const firstLetter = item.lastName.charAt(0).toUpperCase();
            if (!refactoredObject[firstLetter]) {
                refactoredObject[firstLetter] = [];
            }
            refactoredObject[firstLetter].push(item);
        }
    });
    const sortedRefactoredObject: { [key: string]: Contact[] } = {};
    Object.keys(refactoredObject)
        .sort()
        .forEach(key => {
            sortedRefactoredObject[key] = refactoredObject[key];
        });
    return sortedRefactoredObject;
}