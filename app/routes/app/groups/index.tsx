import type {ActionFunction, LoaderFunction} from "@remix-run/node";
import {useFetcher} from "@remix-run/react";
import {FiClock} from "react-icons/fi";
import {json, useLoaderData} from 'superjson-remix';
import Upcoming from "~/components/Upcoming";
import {getContact, getContacts} from "~/models/contact.server";
import {getGroups} from "~/models/group.server";
import {authenticator} from "~/services/auth.server";
import {alphabetizeContacts} from "~/utils/common_functions";
import {useEffect, useState} from "react";
import type {Contact} from "@prisma/client";
import InfoCard from "~/components/InfoCard";

type LoaderData = {
  contacts: Awaited<ReturnType<typeof getContacts>>
  groups: Awaited<ReturnType<typeof getGroups>>
};

export const loader: LoaderFunction = async ({ params, request }) => {

  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json<LoaderData>({
    contacts: await getContacts(user.id),
    groups: await getGroups(user.id),
  });
};


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let values = Object.fromEntries(formData);

  let contactData = {};

  await getContact(values.contactId.toString()).then((contact) => {
    contact ? contactData = contact : contactData = {};
  });

  return contactData;

}


export default function PostSlug() {
  const { contacts, groups } = useLoaderData();

  const alphabetizedContacts = alphabetizeContacts(contacts);
  const [activeContact, setActiveContact] = useState({} as Contact);

  return (
    <>
    <div className="mx-auto max-w-4xl">
      <div className="mx-24 max-h-screen overflow-scroll">
        <h1 className='text-6xl text-indigo-800 font-semibold pt-24 pb-3'>All Contacts</h1>
        <span className="rounded-full bg-indigo-200 py-2 px-4 "><FiClock className="inline mr-2 mb-1" size={20} /> Every</span>
        <Upcoming />
        <div className="text-lg">
            {Object.keys(alphabetizedContacts).map((letter) => {
              return (
                    <div key={letter}>
                    <h2 className="text-2xl text-indigo-800 font-semibold pt-8">{letter}</h2>
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

function ContactEntry({contact, setActiveContact}:{contact:Contact, setActiveContact:any}) {
  const contactData = useFetcher();

  useEffect(() => {
    if(contactData.type === "done") {
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
            {contact.firstName} <b>{contact.lastName}</b>
          </button>
        </contactData.Form>
  )
}

