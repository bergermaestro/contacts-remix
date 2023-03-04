import { Outlet } from "@remix-run/react";
import GroupSidebar from "~/components/GroupSidebar";
import { json, useLoaderData } from 'superjson-remix';
import type { Account } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { getFavorites } from "~/models/contact.server";
import { getGroups, insertGroup } from "~/models/group.server";
import { authenticator } from "~/services/auth.server";
import { getSession } from "~/services/session.server";
import {getTimeLengthInMs} from "~/utils/common_functions";

type LoaderData = {
     favorites: Awaited<ReturnType<typeof getFavorites>>;
     groups: Awaited<ReturnType<typeof getGroups>>
     user: Account
  };

  export const loader: LoaderFunction = async ({ request }) => {
    let user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });

    return json<LoaderData>({
      favorites: await getFavorites(user.id),
      groups: await getGroups(user.id),
      user: user
    });
  };


export const action: ActionFunction = async ({ 
  request, 
  }) => {
    const formData = await request.formData();
    const session = await getSession(
      request.headers.get("Cookie")
    );

    const user = session.data.user;

    const action = formData.get("action");

    if (action === 'addGroup') {
      const groupName = formData.get('groupName') as string;
      const contactFrequency = parseInt(formData.get('contactFrequency') as string);
      const contactFrequencyUnit = formData.get('contactFrequencyUnit') as string;
      const color = (formData.get('color') as string).split('#')[1];

      const contactFrequencyMS = getTimeLengthInMs(contactFrequency, contactFrequencyUnit);

      const contactGroup = {
        accountId: user.id, 
        groupName,
        "contactFrequency": contactFrequencyMS,
        color
      }

      await insertGroup(contactGroup);

    }
    // else if action === set active contact

    return formData;
};

export default function Groups() {
  const { favorites, groups } = useLoaderData();

  return (
    <div className="grid grid-cols-[minmax(300px,_1fr)_4fr_4fr]">
     <GroupSidebar favorites={favorites} groups={groups}/>

      <Outlet />
    </div>
  );
}


