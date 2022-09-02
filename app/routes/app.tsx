import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { json, useLoaderData } from "superjson-remix";
import Modal from "~/components/base/Modal";
import Sidebar from "~/components/base/Sidebar";
import { NewContactModal } from "~/components/ModalContent";
import { getGroups } from "~/models/group.server";
import { authenticator } from "~/services/auth.server";
import { ContactStore } from "~/stores/stateStore";

type LoaderData = {
  groups: Awaited<ReturnType<typeof getGroups>>
};

export const loader: LoaderFunction = async ({ request }) => {
 let user = await authenticator.isAuthenticated(request, {
   failureRedirect: "/login",
 });

 return json<LoaderData>({
   groups: await getGroups(user.id)
 });
};

export const action: ActionFunction = async ({ request }) => {
  console.log("attemping logout");
  await authenticator.logout(request, { redirectTo: "/login" });
};

export default function Groups() {
  const { groups } = useLoaderData();
  const isContactOpen = ContactStore((state) => state.isVisible)
  const toggleContactModal = ContactStore((state) => state.toggle)

  const contact = {};

  return (
    <div className="text-indigo-900 grid grid-cols-[65px_1fr]">
      <Sidebar/>
      <Outlet />
      <Modal modalTitle={"Create Contact"} modalBody={<NewContactModal groups={groups} toggleContactModal={toggleContactModal} contact={contact}/>} isOpen={isContactOpen} action={toggleContactModal}/>
    </div>
  );
}