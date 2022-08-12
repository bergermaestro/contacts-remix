import { Contact } from "@prisma/client";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { json, useLoaderData } from "superjson-remix";
import invariant from "tiny-invariant";
import InfoCard from "~/components/InfoCard";
import NewContactCard from "~/components/NewContactCard";
import { getContact, insertContact } from "~/models/contact.server";
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

export const action: ActionFunction = async ({ 
  request, 
  }) => {
    const formData = await request.formData();


    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const phone = formData.get('phone') as string
    const instagramUsername = formData.get('instagramUsername') as string

    const contact = {
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

    return formData;
};

export default function PostSlug() {
    const isEditing = useEditStore((state) => state.isEdit);
    const { contact } = useLoaderData() as {contact:Contact};

    // console.log(contact);

  return (
    <>
        <Outlet/>
        {isEditing ? <NewContactCard/> :<InfoCard contact={contact} />}
    </>
  );
}

