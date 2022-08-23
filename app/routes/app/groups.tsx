import { Outlet } from "@remix-run/react";
import Sidebar from "~/components/Sidebar";
import { json, useLoaderData } from 'superjson-remix';
import { Account } from "@prisma/client";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { getFavorites, insertContact } from "~/models/contact.server";
import { getGroups, insertGroup } from "~/models/group.server";
import { authenticator } from "~/services/auth.server";
import { getSession } from "~/services/session.server";
import { text2bool } from "~/utils/serde";

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

    if (action === 'addContact') {
      const contactGroupId = formData.get("groupId") as string;
      const firstName = formData.get('firstName') as string;
      const lastName = formData.get('lastName') as string
      const email = formData.get('email') as string
      const company = formData.get('company') as string
      const phone = formData.get('phone') as string
      const isFavorite = text2bool(formData.get('isFavorite') as string)
      const instagramUsername = formData.get('instagramUsername') as string

      console.log("isFavorite", isFavorite);
  
      const contact = {
        accountId: user.id,
        contactGroupId,
        firstName,
        lastName,
        email,
        company,
        phone,
        active:true,
        isFavorite
      }

      await insertContact(contact);
  
    }
    else if (action === 'addGroup') {
      const groupName = formData.get('groupName') as string;
      const contactFrequency = parseInt(formData.get('contactFrequency') as string);

      console.log("groupName", groupName);
      console.log("contactFrequency", contactFrequency);

      const contactGroup = {
        accountId: user.id, 
        groupName,
        contactFrequency,
        color: 'blue'
      }

      await insertGroup(contactGroup);

    }
    return formData;
};

export default function Groups() {
  const { favorites, groups } = useLoaderData();

  return (
    <main className="text-indigo-900 grid grid-cols-[minmax(300px,_1fr)_4fr_4fr]">
     <Sidebar favorites={favorites} groups={groups}/>
      <Outlet />
    </main>
  );
}