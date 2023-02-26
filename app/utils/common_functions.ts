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

export function getInitials(firstName: string, lastName: string) {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}


export function humanizeDuration(duration: number): string {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const millisecondsPerWeek = 7 * millisecondsPerDay;
    const millisecondsPerMonth = 30 * millisecondsPerDay;
    const millisecondsPerYear = 365 * millisecondsPerDay;

    let years = Math.round(duration / millisecondsPerYear);
    let remainingDuration = duration % millisecondsPerYear;
    let months = Math.round(remainingDuration / millisecondsPerMonth);
    remainingDuration = remainingDuration % millisecondsPerMonth;
    let weeks = Math.round(remainingDuration / millisecondsPerWeek);
    remainingDuration = remainingDuration % millisecondsPerWeek;
    let days = Math.round(remainingDuration / millisecondsPerDay);

    let humanizedDuration = "";
    if (years > 0) {
        humanizedDuration += `${years} year${years > 1 ? "s" : ""} `;
        if (months > 0) {
            humanizedDuration += `${months} month${months > 1 ? "s" : ""}`;
        }
    } else if (months > 0) {
        humanizedDuration += `${months} month${months > 1 ? "s" : ""} `;
        if (weeks > 0) {
            humanizedDuration += `${weeks} week${weeks > 1 ? "s" : ""}`;
        }
    } else if (weeks > 0) {
        humanizedDuration += `${weeks} week${weeks > 1 ? "s" : ""} `;
        if (days > 0) {
            humanizedDuration += `${days} day${days > 1 ? "s" : ""}`;
        }
    } else {
        humanizedDuration += `${days} day${days > 1 ? "s" : ""}`;
    }

    return humanizedDuration.trim();
}


export function getTimeLengthInMs(duration: number, unit: string) {
    let multiplier = 1;
    switch (unit) {
        case "days":
            multiplier = 24 * 60 * 60 * 1000;
            break;
        case "weeks":
            multiplier = 7 * 24 * 60 * 60 * 1000;
            break;
        case "months":
            multiplier = 30 * 24 * 60 * 60 * 1000;
            break;
        case "years":
            multiplier = 365 * 24 * 60 * 60 * 1000;
            break;
        default:
            return 0;
    }
    return duration * multiplier;
}