import { Outlet } from "@remix-run/react";
import Sidebar from "~/components/Sidebar";

import { json, useLoaderData } from 'superjson-remix';

import { getFavorites } from "~/models/contact.server";
import { getGroups } from "~/models/group.server";
import Scrollbar from "~/components/Scrollbar";
import { authenticator } from "~/services/auth.server";
import { LoaderFunction } from "@remix-run/node";

type LoaderData = {
    // this is a handy way to say: "Contacts is whatever type getContacts resolves to"
     favorites: Awaited<ReturnType<typeof getFavorites>>;
     groups: Awaited<ReturnType<typeof getGroups>>
  };

  export const loader: LoaderFunction = async ({ request }) => {

    let user = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });

    return json<LoaderData>({
      favorites: await getFavorites(),
      groups: await getGroups(),
    });
  };

export default function Groups() {
    const { favorites, groups } = useLoaderData() as unknown as LoaderData;
  return (
    <main className="text-indigo-900 grid grid-cols-[minmax(300px,_1fr)_0.5fr_4fr_4fr]">
     <Sidebar/>
     <Scrollbar/>
      <Outlet />
    </main>
  );
}