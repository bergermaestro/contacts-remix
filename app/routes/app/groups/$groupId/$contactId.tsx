import { Contact } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { json, useLoaderData } from "superjson-remix";
import invariant from "tiny-invariant";
import InfoCard from "~/components/InfoCard";
import NewContactCard from "~/components/NewContactCard";
import { getContact } from "~/models/contact.server";
import { useEditStore } from "~/stores/editContactStore";

type LoaderData = {
    contact: Awaited<ReturnType<typeof getContact>>
  };

  export const loader: LoaderFunction = async ({ params }) => {
    invariant(params.contactId, `params.contactId is required`);
  
    return json<LoaderData>({
      contact: await getContact(params.contactId),
    });
  };

export default function PostSlug() {
    const isEditing = useEditStore((state) => state.isEdit);
    const { contact } = useLoaderData() as {contact:Contact};

    console.log(contact);

  return (
    <>
        <Outlet/>
        {isEditing ? <NewContactCard/> :<InfoCard contact={contact} />}
    </>
  );
}

