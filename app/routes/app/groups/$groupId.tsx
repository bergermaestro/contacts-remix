import type { LoaderFunction } from "@remix-run/node";
import { json } from 'superjson-remix';
import { useLoaderData } from 'superjson-remix';
import invariant from "tiny-invariant";
import { FiClock } from "react-icons/fi";

import { getContactsByGroup } from "~/models/contact.server";
import { getGroup } from "~/models/group.server";
import { Link, Outlet } from "@remix-run/react";
import Upcoming from "~/components/Upcoming";

type LoaderData = {
  contacts: Awaited<ReturnType<typeof getContactsByGroup>>
  group: Awaited<ReturnType<typeof getGroup>>
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.groupId, `params.groupId is required`);

  return json<LoaderData>({
    contacts: await getContactsByGroup(params.groupId),
    group: await getGroup(params.groupId),
  });
};

export default function PostSlug() {
  const { contacts, group } = useLoaderData() as LoaderData || {};

  return (
    <>
    <div className="mx-auto max-w-4xl">
      <div className="mx-24">
        <h1 className='text-6xl text-indigo-800 font-semibold pt-24 pb-3'>{group?.groupName}</h1>
        <span className="rounded-full bg-indigo-200 py-2 px-4 "><FiClock className="inline mr-2 mb-1" size={20} /> Every {group?.contactFrequency}</span>
        <Upcoming />

        <div className="text-lg">
          {contacts.map(contact => {
            return (
              <div key={contact.id}>
                <Link to={`./${contact.id}`}>
                  {contact.firstName} <b>{contact.lastName}</b>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

    </div>
    <Outlet />
    </>
  );
}