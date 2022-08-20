import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ActionFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { Fragment, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { json, useLoaderData } from "superjson-remix";
import { getFavorites } from "~/models/contact.server";
import { getGroups } from "~/models/group.server";
import { authenticator } from "~/services/auth.server";
import { useEditStore } from "~/stores/editContactStore";
import Modal from "./base/Modal";

type LoaderData = {
  favorites: Awaited<ReturnType<typeof getFavorites>>;
  groups: Awaited<ReturnType<typeof getGroups>>;
};

export const loader = async () => {
  return json<LoaderData>({
    favorites: await getFavorites(),
    groups: await getGroups(),
  });
};

export const action: ActionFunction = async ({ request }) => {
  console.log("attemping logout");
  await authenticator.logout(request, { redirectTo: "/login" });
};

export default function Sidebar() {
  const { favorites, groups } = useLoaderData() as unknown as LoaderData;
  const toggleEditing = useEditStore((state) => state.toggleEdit);

  let [isContactOpen, setContactIsOpen] = useState(false)
  let [isGroupOpen, setGroupIsOpen] = useState(false)

  function toggleContactModal() {
    setContactIsOpen(!isContactOpen)
  }

  function toggleGroupModal() {
    setGroupIsOpen(!isGroupOpen)
  }

  return (
    <div className="bg-indigo-800 text-white h-screen flex flex-col justify-between px-6 w-72">
      <div className="">
        {/* <div className="mt-12 bg-indigo-50 px-4 py-2 rounded-md text-indigo-900"><GoSearch className="inline mr-3 mb-0.5"/>Search</div> */}
        <input
          className="mt-12 bg-indigo-50 px-4 py-2 rounded-md text-indigo-900"
          placeholder="Search"
        />
        {/* <button
          onClick={toggleEditing}
          className="my-12 py-2 px-4 rounded-md bg-indigo-600 flex flex-row justify-between items-center w-full"
        >
          <span>New Contact</span>
          <BsPlusLg />
        </button> */}
        <button
          onClick={toggleContactModal}
          className="my-12 py-2 px-4 rounded-md bg-indigo-600 flex flex-row justify-between items-center w-full"
          >
          <span>New Contact</span>
          <BsPlusLg />
        </button>

        <Modal modalTitle={"Create Contact"} modalBody={<NewContactModal/>} isOpen={isContactOpen} action={toggleContactModal}/>
        {/* <button onClick={() => createContact('matthew', 'berger', '12345678@email.com', true)} className="my-12 py-2 px-4 rounded-md bg-indigo-600 flex flex-row justify-between items-center w-full"><span>New Contact</span><BsPlusLg/></button> */}
        {/* <button className="my-12 py-2 px-4 rounded-md bg-indigo-600 flex flex-row justify-between items-center w-full"><span>New Contact</span><BsPlusLg/></button> */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button>
                <h3 className="text-2xl font-bold mb-4">
                  <MdKeyboardArrowDown
                    className={`inline mr-3 transform rotate-180 transition-transform ${
                      open ? "transform rotate-0" : ""
                    }`}
                  />
                  Favourites
                </h3>
              </Disclosure.Button>
              <Transition
                enter="transition-all duration-150"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-full"
                leaveFrom="opacity-100 max-h-full"
                leaveTo="opacity-0 max-h-0"
                leave="transition-all duration-150"
              >
                <Disclosure.Panel className="space-y-4 pl-7">
                  {favorites.map((favorite) => (
                    <Link
                      to={`/app/groups/${favorite.contactGroupId}/${favorite.id}`}
                      key={favorite.id}
                    >
                      <div className="flex flex-row items-center cursor-pointer mb-3">
                        <div className="h-6 w-6 rounded-full bg-white inline-block mr-4" />{" "}
                        {favorite.firstName} {favorite.lastName}
                      </div>
                    </Link>
                  ))}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
        <div className="h-12"></div>

        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button>
                <h3 className="text-2xl font-bold mb-4">
                  <MdKeyboardArrowDown
                    className={`inline mr-3 transform rotate-180 transition-transform ${
                      open ? "transform rotate-0" : ""
                    }`}
                  />
                  Categories
                </h3>
              </Disclosure.Button>
              <Transition
                enter="transition-all duration-150"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-full"
                leaveFrom="opacity-100 max-h-full"
                leaveTo="opacity-0 max-h-0"
                leave="transition-all duration-150"
              >
                <Disclosure.Panel className="space-y-2 pl-7">
                  {/* this is needed so that tailwind doesn't purge the classes at build. perhaps figure out a cleaner solution to this */}
                  <span className="bg-blue-500 bg-green-500 bg-red-500"></span>
                  <Link to="./">
                    <div className="flex flex-row items-center cursor-pointer">
                      <div className="h-3 w-3 rounded-full bg-yellow-500 inline-block mr-4" />{" "}
                      All
                    </div>
                  </Link>
                  {groups.map((group) => (
                    <Link key={group.id} to={`/app/groups/${group.id}`}>
                      <div className="flex flex-row items-center cursor-pointer">
                        <div
                          className={`h-3 w-3 rounded-full inline-block mr-4 bg-${group.color}-500`}
                        />{" "}
                        {group.groupName}
                      </div>
                    </Link>
                  ))}
                  <button className="font-semibold text-indigo-200 pt-6" onClick={toggleGroupModal}>
                    <BsPlusLg className="inline mr-3 mb-0.5" /> New Category
                  </button>
                  <Modal modalTitle={"Create Contact Group"} modalBody={<NewGroupModal/>} isOpen={isGroupOpen} action={toggleGroupModal}/>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>

      <div className="py-6">
        <Menu as="div" className="relative">
          <Menu.Button
            className={
              "px-4 py-2 rounded-md border-indigo-500 border-2 w-full hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            }
          >
            Account Details
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute -top-6 transform -translate-y-full my-2 w-full origin-top-righ rounded-md bg-indigo-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-clip">
              <div className="hover:bg-indigo-600">
                <Menu.Item>
                  <Form method="post" action="/app?index">
                    <button className="px-1 py-3 w-full text-left">
                      <IoLogOut size={25} className="inline mx-4" />
                      <span className="font-semibold">Sign Out</span>
                    </button>
                  </Form>
                </Menu.Item>
              </div>
              <div className="px-1 py-3 hover:bg-indigo-600">
                <Menu.Item>
                  <Link to="/app/settings">
                    <div>
                      <IoMdSettings size={25} className="inline mx-4" />
                      <span className="font-semibold">Account Settings</span>
                    </div>
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}


const NewContactModal = () => (
  <>
   <Form method="post" className="grid w-3/4 gap-4 grid-cols-[1fr_3fr]">
        <input hidden name="groupId"/>
    
        <div className="w-32 h-32 bg-gray-400 rounded-full">
        </div>
        <div>
          <input className="block outline-gray-400 p-2 my-2 rounded-lg placeholder-gray-400 border"type="text" name='firstName' placeholder="First Name"/>
          <input className="block outline-gray-400 p-2 my-2 rounded-lg placeholder-gray-400 border"type="text" name='lastName' placeholder="Last Name"/>
        </div>

        <span className='text-right text-gray-400 my-auto'>Company</span>
        <input className="block outline-gray-400 p-2 my-2 rounded-lg placeholder-gray-400 border"type="text" name='company' placeholder="Company"/>
        
        <span className='text-right text-gray-400 my-auto'>Username</span>
        <input className="block outline-gray-400 p-2 my-2 rounded-lg placeholder-gray-400 border"type="text" name='instagramUsername' placeholder="Username"/>

        <span className='text-right text-gray-400 my-auto'>Email</span>
        <input className="block outline-gray-400 p-2 my-2 rounded-lg placeholder-gray-400 border"type="text" name='email' placeholder="Email"/>

        <span className='text-right text-gray-400 my-auto'>Phone Number</span>
        <input className="block outline-gray-400 p-2 my-2 rounded-lg placeholder-gray-400 border"type="text" name='phone' placeholder="Phone Number"/>

        <button type="submit" className="py-2 px-4 mr-4 rounded-lg bg-indigo-900 border-2 border-indigo-900 text-white">Save</button>
        <button className="py-2 px-4 rounded-lg border-2 border-indigo-900">Cancel</button> 
    </Form>
  </>
  );

  const NewGroupModal = () => (
    <>
      <Form method="post" className="grid w-3/4 gap-2 grid-cols-[1fr_3fr]">
        <input className="block outline-gray-400 p-2 my-2 rounded-lg placeholder-gray-400 border"type="text" name='phone' placeholder="Group Name"/>

        <span className='text-right text-gray-400 my-auto'>Frequency</span>
        <input className="block outline-gray-400 p-2 my-2 rounded-lg placeholder-gray-400 border"type="text" name='phone' placeholder="Contact Frequency"/>

        <input type="color" id="favcolor" name="favcolor" value="#ff0000"></input>
      </Form>
    </>
  );