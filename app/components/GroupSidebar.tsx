import {Dialog, Disclosure, Transition} from "@headlessui/react";
import {Avatar, ColorInput, Input, Menu, NumberInput, Select} from "@mantine/core";
import type {Contact, ContactGroup} from "@prisma/client";
import type {ActionFunction} from "@remix-run/node";
import {Form, Link, useFetcher} from "@remix-run/react";
import {useEffect, useState} from "react";
import {BsClock, BsPlusLg} from "react-icons/bs";
import {IoPeopleOutline} from "react-icons/io5";
import {MdKeyboardArrowDown} from "react-icons/md";
import {authenticator} from "~/services/auth.server";
import {ContactStore} from "~/stores/stateStore";
import Modal from "./base/Modal";
import {getInitials} from "~/utils/common_functions";
import {NewGroupModal} from "~/components/modals/GroupModal";

export const action: ActionFunction = async ({request}) => {
    console.log("attemping logout");
    await authenticator.logout(request, {redirectTo: "/login"});
};

export default function GroupSidebar({favorites, groups}: { favorites: Contact[], groups: ContactGroup[] }) {

    const [toggleContactModal, setActiveContact] = ContactStore((state) => [state.toggleModal, state.setActiveContact]);

    // const toggleContactModal = ContactStore((state) => state.setModalVisibility())
    // const setActiveContact = ContactStore((state) => state.setActiveContact);

    const [isGroupOpen, setGroupIsOpen] = useState(false)
    const [isGroupContextOpen, setGroupContextOpen] = useState(false)
    const [isFavoriteContextOpen, setFavoriteContextOpen] = useState(false)

    const [activeGroup, setActiveGroup] = useState(null as ContactGroup | null)

    const [points, setPoints] = useState({x: 0, y: 0})

    const GroupContext = () => (
        <Dialog open={isGroupContextOpen} onClose={() => setGroupContextOpen(false)}>

            {/* Block Selecting Other Elements */}
            <div className="fixed inset-0" aria-hidden="true" />

            <Dialog.Panel className="absolute" style={{top: points.y + "px", left: points.x + "px"}}>
                <Menu shadow="md" width={200} opened={true} onChange={() => setGroupContextOpen(false)}>
                    <Menu.Dropdown>
                        <Menu.Item onClick={() => setGroupIsOpen(true)}>Edit</Menu.Item>
                        <Menu.Item color="red">Delete</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Dialog.Panel>
        </Dialog>
    );

    const FavoriteContext = () => (
        <Dialog open={isFavoriteContextOpen} onClose={() => setFavoriteContextOpen(false)}>
            {/* Block Selecting Other Elements */}
            <div className="fixed inset-0" aria-hidden="true" />

            <Dialog.Panel className="absolute" style={{top: points.y + "px", left: points.x + "px"}}>
                <Menu shadow="md" width={200} opened={true} onChange={() => setFavoriteContextOpen(false)}>
                    <Menu.Dropdown>
                        <Menu.Item onClick={toggleContactModal}>Edit</Menu.Item>
                        <Menu.Item>Remove from Favorites</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Dialog.Panel>
        </Dialog>
    );



    return (
        <>
            <Modal modalTitle={`${activeGroup?.id ? 'Edit' : 'Create'} Contact Group`}
                   modalBody={<NewGroupModal toggleGroupModal={() => setGroupIsOpen(!isGroupOpen)} group={activeGroup}/>}
                   isOpen={isGroupOpen} action={() => setGroupIsOpen(!isGroupOpen)}/>

            <div className="bg-indigo-800 text-white h-screen flex flex-col justify-between px-6 w-72">
                <div>
                    <GroupContext/>
                    <FavoriteContext/>

                    <button
                        onClick={() => {toggleContactModal(); setActiveContact({})}}
                        className="my-12 py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-500 flex flex-row justify-between items-center w-full transition-colors duration-100"
                    >
                        <span>New Contact</span>
                        <BsPlusLg/>
                    </button>

                    <Disclosure defaultOpen>
                        {({open}) => (
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
                                            <button onClick={() => setActiveContact(favorite)} className="flex flex-row items-center cursor-pointer mb-3" key={favorite.id}
                                                    onContextMenu={(e) => {
                                                        e.preventDefault(); // prevent the default behaviour when right clicked
                                                        console.log("Right Click");
                                                        setPoints({
                                                            x: e.pageX,
                                                            y: e.pageY,
                                                        });
                                                        setFavoriteContextOpen(true);
                                                        setActiveContact(favorite);
                                                    }}>
                                                <Avatar size="sm" className="rounded-full h-6 w-6 mr-4" color="indigo" src={favorite.profileURL} alt={favorite.firstName}>{getInitials(favorite.firstName || "", favorite.lastName || "")}</Avatar>
                                                {favorite.firstName} {favorite.lastName}
                                            </button>
                                        ))}
                                    </Disclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                    <div className="h-12"></div>

                    <Disclosure defaultOpen>
                        {({open}) => (
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
                                        <Link to="./">
                                            <div className="flex flex-row items-center cursor-pointer">
                                                <div className="h-3 w-3 rounded-full bg-yellow-500 inline-block mr-4"/>
                                                {" "}
                                                All
                                            </div>
                                        </Link>
                                        {groups.map((group) => (
                                            <Link key={group.id} to={`/app/groups/${group.id}`}>
                                                <div className="flex flex-row items-center cursor-pointer"
                                                     onContextMenu={(e) => {
                                                         e.preventDefault(); // prevent the default behaviour when right clicked
                                                         setPoints({
                                                             x: e.pageX,
                                                             y: e.pageY,
                                                         });
                                                        setGroupContextOpen(true);
                                                         setActiveGroup(group);
                                                     }}>
                                                    <div
                                                        className={"h-3 w-3 rounded-full inline-block mr-4"}
                                                        style={{backgroundColor: `#${group.color}`}}
                                                    />
                                                    {" "}
                                                    {group.groupName}
                                                </div>
                                            </Link>
                                        ))}
                                        <button className="font-semibold text-indigo-200 pt-6" onClick={() => setGroupIsOpen(true)}>
                                            <BsPlusLg className="inline mr-3 mb-0.5"/> New Category
                                        </button>
                                    </Disclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div>
        </>
    );
}