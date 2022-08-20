import { Contact } from "@prisma/client";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { json, useLoaderData } from "superjson-remix";
import invariant from "tiny-invariant";
import InfoCard from "~/components/InfoCard";
import { getContact, insertContact } from "~/models/contact.server";
import { authenticator } from "~/services/auth.server";

type LoaderData = {
    contact: Awaited<ReturnType<typeof getContact>>
    groupId: string
  };

export const loader: LoaderFunction = async ({ params, request }) => {

  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  invariant(params.contactId, `params.contactId is required`);
  invariant(params.groupId, `params.groupId is required`);
  

  return json<LoaderData>({
    contact: await getContact(params.contactId),
    groupId: params.groupId,
  });
};

export const action: ActionFunction = async ({ 
  request, 
  }) => {
    const formData = await request.formData();

    const contactGroupId = formData.get("groupId") as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const phone = formData.get('phone') as string
    const instagramUsername = formData.get('instagramUsername') as string

    const contact = {
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

    return formData;
};

export default function PostSlug() {
    const { contact, groupId } = useLoaderData() as {contact:Contact, groupId:string};

  return (
    <>
        <Outlet/>
        <InfoCard contact={contact} />
    </>
  );
}

