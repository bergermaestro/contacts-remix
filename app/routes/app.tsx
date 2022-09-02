import { Account, ContactGroup } from "@prisma/client";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Outlet } from "@remix-run/react";
import { json, useLoaderData } from "superjson-remix";
import Modal from "~/components/base/Modal";
import Sidebar from "~/components/base/Sidebar";
import { getFavorites } from "~/models/contact.server";
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

  return (
    <div className="text-indigo-900 grid grid-cols-[65px_1fr]">
      <Sidebar/>
      <Outlet />
      <Modal modalTitle={"Create Contact"} modalBody={<NewContactModal groups={groups} toggleContactModal={toggleContactModal}/>} isOpen={isContactOpen} action={toggleContactModal}/>
    </div>
  );
}

const NewContactModal = ({ groups, toggleContactModal } : { groups:ContactGroup[], toggleContactModal:VoidFunction }) => (
  <>
   <Form method="post">
      <input readOnly hidden name="action" value="addContact"></input>
      <fieldset>
        <div className="grid w-3/4 gap-2 grid-cols-[1fr_3fr]">    
          <div className="w-24 h-24 bg-gray-400 rounded-full">
          </div>
          <div>
            <input className="outline-gray-400 p-2 my-2 rounded-lg placeholder-gray-400 border"type="text" name='firstName' placeholder="First Name"/>
            <input className="inline p-2 ml-2 h-8 w-8" type="checkbox" name="isFavorite"></input>
            <input className="block outline-gray-400 p-2 my-2 rounded-lg placeholder-gray-400 border"type="text" name='lastName' placeholder="Last Name"/>
          </div>

          <label htmlFor='groupId' className='text-right text-gray-400 my-auto'>Group</label>
          <select className="block outline-gray-400 p-2 rounded-lg placeholder-gray-400 border" placeholder="Group" name="groupId">
            <option value="">- Select Group -</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>{group.groupName}</option>
              ))}
          </select>

          <label htmlFor='company' className='text-right text-gray-400 my-auto'>Company</label>
          <input className="block outline-gray-400 p-2 rounded-lg placeholder-gray-400 border"type="text" name='company' placeholder="Company"/>
          
          <label htmlFor='instagramUsername' className='text-right text-gray-400 my-auto'>Username</label>
          <input className="block outline-gray-400 p-2 rounded-lg placeholder-gray-400 border"type="text" name='instagramUsername' placeholder="Username"/>

          <label htmlFor='email' className='text-right text-gray-400 my-auto'>Email</label>
          <input className="block outline-gray-400 p-2 rounded-lg placeholder-gray-400 border"type="text" name='email' placeholder="Email"/>

          <label htmlFor='' className='text-right text-gray-400 my-auto'>Phone</label>
          <input className="block outline-gray-400 p-2 rounded-lg placeholder-gray-400 border"type="text" name='phone' placeholder="Phone"/>
        </div>  
        <div className="mt-6">
            <button type="submit" className="py-2 px-4 mr-2 rounded-lg bg-indigo-900 border-2 border-indigo-900 text-white" onClick={toggleContactModal}>Save</button>
            <button type="button" className="py-2 px-4 rounded-lg border-2 border-indigo-400 text-indigo-400" onClick={toggleContactModal}>Cancel</button> 
        </div>
      </fieldset>
    </Form>
  </>
);