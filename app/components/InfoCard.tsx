import { Contact, ContactGroup } from "@prisma/client";
import { useState } from "react";
import Modal from "./base/Modal";
import { NewContactModal } from "./ModalContent";
import { Avatar } from '@mantine/core';
import {getInitials} from "~/utils/common_functions";

const InfoCard = ({contact, groups}: {contact:Contact, groups:ContactGroup[]}) => {
  // const toggleContactModal = ContactStore((state) => state.toggle)
  let [isContactOpen, setContactIsOpen] = useState(false)

  function toggleContactModal() {
    setContactIsOpen(!isContactOpen)
  }
  
  if(!contact) {
    return (
      <div>Oops, no contact found!</div>
    )
  }

  return (
    <div className="bg-indigo-100 h-3/5 pt-12 pb-24 px-12 ml-24 my-auto rounded-lg text-indigo-800">

    {/*<img src={contact.profileURL || undefined} alt={contact.firstName} className="h-24 w-24 rounded-full"></img>*/}
    <Avatar size="xl" color="indigo" className="rounded-full h-24 w-24" src={contact.profileURL} alt={contact.firstName}>{getInitials(contact.firstName || "", contact.lastName || "")}</Avatar>

    <h2 className="font-bold text-4xl pt-4">{contact.firstName} {contact.lastName}</h2>
    <h4>{contact.company}</h4>

    <div className="h-12"></div>

    <span className="bg-indigo-200 px-4 py-2 rounded-md">Last contacted 14 days ago</span>

    <div className="h-12"></div>


    <h3 className="font-semibold text-3xl">Quick Info</h3>
    <p>{contact.email}</p>

    <div className="h-6"></div>

    <h3 className="font-semibold text-3xl">Notes</h3>
    <p className="w-2/3 leading-tight">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</p>
    
    <button className="px-4 py-2 border-2 border-indigo-800 rounded-lg text-indigo-800 font-bold my-4" onClick={toggleContactModal}>Edit</button>
    <Modal modalTitle={"Create Contact"} modalBody={<NewContactModal groups={groups} toggleContactModal={toggleContactModal} contact={contact}/>} isOpen={isContactOpen} action={toggleContactModal}/>
    </div>
  )
}

export default InfoCard