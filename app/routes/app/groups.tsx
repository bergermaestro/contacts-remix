import { Outlet } from "@remix-run/react";
import Sidebar from "~/components/Sidebar";

import { json, useLoaderData } from 'superjson-remix';

import { getContact, insertContact } from "~/models/contact.server";
import { getFavorites } from "~/models/contact.server";
import { getGroups, insertGroup } from "~/models/group.server";
import Scrollbar from "~/components/Scrollbar";
import { authenticator } from "~/services/auth.server";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Account, ContactGroup } from "@prisma/client";

type LoaderData = {
    // this is a handy way to say: "Contacts is whatever type getContacts resolves to"
     favorites: Awaited<ReturnType<typeof getFavorites>>;
     groups: Awaited<ReturnType<typeof getGroups>>
     user: Account
  };

  export const loader: LoaderFunction = async ({ request }) => {
    let user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });

    console.log("USER", user)

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
    const { favorites, groups, user } = useLoaderData()

    user.firstName

    const action = formData.get("action");

    console.log("ACTION", action);

    if (action === 'addContact') {
      const contactGroupId = formData.get("groupId") as string;
      const firstName = formData.get('firstName') as string;
      const lastName = formData.get('lastName') as string
      const email = formData.get('email') as string
      const company = formData.get('company') as string
      const phone = formData.get('phone') as string
      const instagramUsername = formData.get('instagramUsername') as string
  
      const contact = {
        accountId: user.id,
        contactGroupId,
        firstName,
        lastName,
        email,
        company,
        phone,
        active:true,
        isFavorite:false
      }
  
      console.log("\n\n\nCreated New Contact!");
      console.log(firstName, lastName, email);
  
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