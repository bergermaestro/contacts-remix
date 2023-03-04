import { Contact, ContactGroup } from "@prisma/client";
import { useState } from "react";
import Modal from "./base/Modal";
import { ContactModal } from "./modals/ContactModal";
import { Avatar } from '@mantine/core';
import {getInitials} from "~/utils/common_functions";
import {ContactStore} from "~/stores/stateStore";

const InfoCard = ({contact, groups}: {contact?:Contact, groups:ContactGroup[]}) => {
  // const toggleContactModal = ContactStore((state) => state.toggle)
  // let [isContactOpen, setContactIsOpen] = useState(false)
  // const setActiveContact = ActiveContactStore((state) => state.setActiveContact);

  const [toggleContactModal, setActiveContact, activeContact] = ContactStore((state) => [state.toggleModal, state.setActiveContact, state.activeContact]);

  function updateModal(contact:Contact) {
    toggleContactModal();
    setActiveContact(contact)
  }
  
  if(!contact) {
    return (
      <div></div>
    )
  }

  return (
      <>
        {/*<Modal modalTitle={`${contact.id ? 'Edit' : 'Create'} Contact`}*/}
        {/*       modalBody={<ContactModal groups={groups} toggleContactModal={toggleContactModal} contact={contact}/>}*/}
        {/*       isOpen={isContactOpen} action={toggleContactModal}/>*/}


        <div className="bg-indigo-100 h-4/5 pt-12 pb-24 px-12 ml-24 my-auto rounded-lg text-indigo-800">

          <Avatar size="xl" color="indigo" className="rounded-full h-24 w-24" src={contact.profileURL}
                  alt={contact.firstName}>{getInitials(contact.firstName || "", contact.lastName || "")}</Avatar>

          <h2 className="font-bold text-4xl pt-4">{contact.firstName} {contact.lastName}</h2>
          <h4>{contact.company}</h4>

          <div className="h-12"></div>

          <span className="bg-indigo-200 px-4 py-2 rounded-md">Last contacted 14 days ago</span>

          <div className="h-12"></div>


          <h3 className="font-semibold text-3xl">Quick Info</h3>
          <p>{contact.email}</p>

          <div className="h-6"></div>

          <h3 className="font-semibold text-3xl">Notes</h3>
          <p className="w-2/3 leading-tight">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>

          <button className="px-4 py-2 border-2 border-indigo-800 rounded-lg text-indigo-800 font-bold my-4"
                  onClick={() => {updateModal(contact); console.log("activeContact", activeContact)}}>Edit
          </button>
        </div>
      </>
  )
}

export default InfoCard