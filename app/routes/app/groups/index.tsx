import type {LoaderFunction} from "@remix-run/node";
import {json, useLoaderData} from 'superjson-remix';
import Upcoming from "~/components/Upcoming";
import {getContacts, getUpcomingContacts} from "~/models/contact.server";
import {getGroups} from "~/models/group.server";
import {authenticator} from "~/services/auth.server";
import {alphabetizeContacts} from "~/utils/common_functions";
import InfoCard from "~/components/InfoCard";
import {ContactStore} from "~/stores/stateStore";

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

export default function PostSlug() {
    const {contacts, upcomingContacts, groups} = useLoaderData();

    const alphabetizedContacts = alphabetizeContacts(contacts);

    const [setActiveContact, activeContact] = ContactStore((state) => [state.setActiveContact, state.activeContact]);

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
                                            <button key={contact.id} onClick={() => setActiveContact(contact)} className="block">
                                                <span>{contact.firstName}</span> <b>{contact.lastName}</b>
                                            </button>
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