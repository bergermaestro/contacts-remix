import type {Contact} from "@prisma/client";
import {ContactStore} from "~/stores/stateStore";

export default function Upcoming({contacts}: {contacts: Contact[]}) {

    const [setActiveContact] = ContactStore((state) => [state.setActiveContact]);


  return (
    <div className="py-12 w-96 text-indigo-800">
        <h2 className="text-2xl font-semibold pb-3">Upcoming Soon</h2>
        <div>
            {contacts.slice(0, 5).map((contact) => {
                return (
                    <div key={contact.id}>
                        <div className="flex flex-row justify-between pb-2 mx-4">
                            <button className="font-bold text-md" onClick={() => setActiveContact(contact)}>{contact.firstName} {contact.lastName}</button>
                            <span>{displayDate(new Date(contact.lastContacted || ""))}</span>
                        </div>
                        <hr className="pb-4"/>
                    </div>
                    )
                })
            }
        </div>
    </div>
  )
}

function displayDate(date: Date): string {
    const now = new Date();
    const twoWeeksInMs = 1209600000;
    const diff = date.getTime() - now.getTime();
    const absDiff = Math.abs(diff);

    if (absDiff < twoWeeksInMs) {
        return diff > 0 ? `In ${Math.ceil(absDiff / 86400000)} days` : `${Math.ceil(absDiff / 86400000)} days ago`;
    } else {
        return date.toLocaleDateString("en-US");
    }
}