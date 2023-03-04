import {ActionFunction, fetch, LoaderFunction} from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { json, useLoaderData } from "superjson-remix";
import Modal from "~/components/base/Modal";
import Sidebar from "~/components/base/Sidebar";
import { ContactModal } from "~/components/modals/ContactModal";
import { insertContact } from "~/models/contact.server";
import { getGroups } from "~/models/group.server";
import { authenticator } from "~/services/auth.server";
import { getSession } from "~/services/session.server";
import { ContactStore } from "~/stores/stateStore";
import { text2bool } from "~/utils/serde";
import { generateS3UploadURL } from "~/services/s3upload.server";

type LoaderData = {
  groups: Awaited<ReturnType<typeof getGroups>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json<LoaderData>({
    groups: await getGroups(user.id),
  });
};

export const action: ActionFunction = async ({ request }) => {

  const formData = await request.formData();
  const session = await getSession(request.headers.get("Cookie"));

  const user = session.data.user;

  const action = formData.get("action");

  if (action === "addContact") {
    const id = formData.get("id") as string;
    const contactGroupId = formData.get("groupId") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const phone = formData.get("phone") as string;
    const isFavorite = text2bool(formData.get("isFavorite") as string);
    const instagramUsername = formData.get("instagramUsername") as string;

    const profilePicture = formData.get("profilePicture");

    const url = await generateS3UploadURL();

    await fetch(url,{
        method: "PUT",
        body: profilePicture,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    const imageUrl = url.split("?")[0];

    console.log("url: ", url)
    console.log("profilePicture: ", profilePicture)


    const contact = {
      accountId: user.id,
      id,
      contactGroupId,
      firstName,
      lastName,
      email,
      company,
      phone,
      active: true,
      isFavorite,
      profileURL: imageUrl,
    };

    await insertContact(contact);
  }

  return formData;
};

export default function Groups() {
  const { groups } = useLoaderData();
  const [isContactModalOpen, toggleContactModal, activeContact] = ContactStore((state) => [state.isModalOpen, state.toggleModal, state.activeContact]);


  return (
      <>
        {/* Contact Modal */}
        <Modal modalTitle={`${activeContact?.id ? 'Edit' : 'Create'} Contact`} isOpen={isContactModalOpen} action={toggleContactModal}
               modalBody={<ContactModal groups={groups} toggleContactModal={toggleContactModal} contact={activeContact}/>}
        />

        <div className="text-indigo-900 grid grid-cols-[65px_1fr]">
          <Sidebar/>
          <Outlet/>
        </div>
      </>
  );
}
