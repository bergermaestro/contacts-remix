import { Outlet } from "@remix-run/react";
import Sidebar from "~/components/Sidebar";

import { json } from 'superjson-remix';
import { Link } from "@remix-run/react";
import { useLoaderData } from 'superjson-remix';

import { getFavorites } from "~/models/contact.server";
import { getGroups } from "~/models/group.server";
import { authenticator } from "~/services/auth.server";
import { ActionFunction, LoaderFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  console.log("attemping logout");
  await authenticator.logout(request, { redirectTo: "/login" });
};


type LoaderData = {
    // this is a handy way to say: "Contacts is whatever type getContacts resolves to"
     favorites: Awaited<ReturnType<typeof getFavorites>>;
     groups: Awaited<ReturnType<typeof getGroups>>
  };
  
  export const loader:LoaderFunction = async ({ request }) => {

    let user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });

    return json<LoaderData>({
      favorites: await getFavorites(),
      groups: await getGroups(),
    });
  };

export default function Groups() {
  return (
    <div>
     <Sidebar/>
      <Outlet />
    </div>
  );
}