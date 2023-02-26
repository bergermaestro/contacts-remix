import type {ActionFunction, LoaderFunction} from "@remix-run/node";
import {useFetcher} from "@remix-run/react";
import {FiClock} from "react-icons/fi";
import {json, useLoaderData} from 'superjson-remix';
import invariant from "tiny-invariant";
import Upcoming from "~/components/Upcoming";
import {getContact, getContacts, getUpcomingContacts} from "~/models/contact.server";
import {getGroup, getGroups} from "~/models/group.server";
import {authenticator} from "~/services/auth.server";
import type {Contact} from "@prisma/client";
import {useEffect, useState} from "react";
import InfoCard from "~/components/InfoCard";
import {alphabetizeContacts, humanizeDuration} from "~/utils/common_functions";

type LoaderData = {
  contacts: Awaited<ReturnType<typeof getContacts>>
  upcomingContacts: Awaited<ReturnType<typeof getUpcomingContacts>>
  group: Awaited<ReturnType<typeof getGroup>>
  groups: Awaited<ReturnType<typeof getGroups>>
};

export const loader: LoaderFunction = async ({ params, request }) => {

  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  invariant(params.groupId, `params.groupId is required`);

  return json<LoaderData>({
    contacts: await getContacts(user.id, params.groupId),
    upcomingContacts: await getUpcomingContacts(user.id, params.groupId),
    group: await getGroup(params.groupId),
    groups: await getGroups(user.id)
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
  const { contacts, upcomingContacts, group, groups } = useLoaderData() as LoaderData;
  // const humanizeDuration = require("humanize-duration");

  const alphabetizedContacts = alphabetizeContacts(contacts);
  const [activeContact, setActiveContact] = useState({} as Contact);

  return (
    <>
    <div className="mx-auto max-w-4xl">
      <div className="mx-24">
        <h1 className='text-6xl text-indigo-800 font-semibold pt-24 pb-3'>{group?.groupName}</h1>
        {/*<span className="rounded-full bg-indigo-200 py-2 px-4 "><FiClock className="inline mr-2 mb-1" size={20} /> Every {humanizeDuration(Number(group?.contactFrequency), { largest: 1,  round: true })}</span>*/}
        <span className="rounded-full bg-indigo-200 py-2 px-4 "><FiClock className="inline mr-2 mb-1" size={20} /> Every {humanizeDuration(Number(group?.contactFrequency))}</span>
        <Upcoming contacts={upcomingContacts}/>
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

