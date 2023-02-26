import type {ActionFunction, LoaderFunction} from "@remix-run/node";
import {useFetcher} from "@remix-run/react";
import {FiClock} from "react-icons/fi";
import {json, useLoaderData} from 'superjson-remix';
import Upcoming from "~/components/Upcoming";
import {getContact, getContacts, getUpcomingContacts} from "~/models/contact.server";
import {getGroups} from "~/models/group.server";
import {authenticator} from "~/services/auth.server";
import {alphabetizeContacts} from "~/utils/common_functions";
import {useEffect, useState} from "react";
import type {Contact} from "@prisma/client";
import InfoCard from "~/components/InfoCard";

type LoaderData = {
    contacts: Awaited<ReturnType<typeof getContacts>>
    upcomingContacts: Awaited<ReturnType<typeof getUpcomingContacts>>
    groups: Awaited<ReturnType<typeof getGroups>>
};

export const loader: LoaderFunction = async ({params, request}) => {

    let user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    return json<LoaderData>({
        contacts: await getContacts(user.id),
        upcomingContacts: await getUpcomingContacts(user.id),
        groups: await getGroups(user.id),
    });
};


export const action: ActionFunction = async ({request}) => {
    const formData = await request.formData();
    let values = Object.fromEntries(formData);

    let contactData = {};

    await getContact(values.contactId.toString()).then((contact) => {
        contact ? contactData = contact : contactData = {};
    });

    return contactData;

}


export default function PostSlug() {
    const {contacts, upcomingContacts, groups} = useLoaderData();

    const alphabetizedContacts = alphabetizeContacts(contacts);
    const [activeContact, setActiveContact] = useState({} as Contact);

    console.log("upcomingContacts: ", upcomingContacts)

    return (
        <>
            <div className="mx-auto max-w-4xl">
                <div className="px-24 max-h-screen overflow-scroll scrollbar-none">
                    <div className="sticky top-0 bg-white backdrop-blur-md backdrop-opacity-50">
                        <h1 className="text-6xl text-indigo-800 font-semibold pt-24 pb-3">All Contacts</h1>
                        <div className="w-full bg-gradient-to-b from-white h-12"></div>
                    </div>
                    <Upcoming contacts={contacts}/>
                    <div className="text-lg">
                        {Object.keys(alphabetizedContacts).map((letter) => {
                            return (
                                <div key={letter}>
                                    <h2 className="text-2xl text-indigo-800 font-semibold pt-8"
                                        id={letter}>{letter}</h2>
                                    {alphabetizedContacts[letter].map((contact) => {
                                        return (
                                            <div key={contact.id}>
                                                <ContactEntry contact={contact} setActiveContact={setActiveContact}/>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })
                        }
                    </div>

                </div>

            </div>
            <InfoCard contact={activeContact} groups={groups}/>
        </>
    );
}

function ContactEntry({contact, setActiveContact}: { contact: Contact, setActiveContact: any }) {
    const contactData = useFetcher();

    useEffect(() => {
        if (contactData.type === "done") {
            setActiveContact(contactData.data);
        }
    }, [contactData, setActiveContact])

    return (
        <contactData.Form method="post">
            <input type="hidden" name="contactId" value={contact.id}>
            </input>
            <button
                type="submit"
                name="_action"
                value="select">
                <span>{contact.firstName}</span> <b>{contact.lastName}</b>
            </button>
        </contactData.Form>
    )
}

