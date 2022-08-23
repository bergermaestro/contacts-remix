import { Contact } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { json, useLoaderData } from "superjson-remix";
import invariant from "tiny-invariant";
import InfoCard from "~/components/InfoCard";
import { getContact } from "~/models/contact.server";
import { authenticator } from "~/services/auth.server";

type LoaderData = {
    contact: Awaited<ReturnType<typeof getContact>>
    groupId: string
  };

export const loader: LoaderFunction = async ({ params, request }) => {

  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  invariant(params.contactId, `params.contactId is required`);
  invariant(params.groupId, `params.groupId is required`);
  

  return json<LoaderData>({
    contact: await getContact(params.contactId),
    groupId: params.groupId,
  });
};

export default function PostSlug() {
    const { contact } = useLoaderData();

  return (
    <>
        <Outlet/>
        <InfoCard contact={contact} />
    </>
  );
}

