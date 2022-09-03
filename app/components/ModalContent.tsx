import { Tooltip } from "@mantine/core";
import { ContactGroup } from "@prisma/client";
import { Form } from "@remix-run/react";

export const NewContactModal = ({
  groups,
  toggleContactModal,
  contact,
}: {
  groups: ContactGroup[];
  toggleContactModal: VoidFunction;
  contact: any;
}) => (
  <>
    <Form method="post">
      <input readOnly hidden name="action" value="addContact"></input>
      <fieldset>
        <div className="grid w-3/4 gap-2 grid-cols-[1fr_3fr]">
          <div className="w-24 h-24 bg-gray-400 rounded-full"></div>
          <div>
            <input
              className="outline-gray-400 p-2 my-2 rounded-lg placeholder-gray-400 border"
              type="text"
              name="firstName"
              placeholder="First Name"
              defaultValue={contact.firstName}
            />
            <Tooltip label="Favorite this Contact" color="gray" withArrow>
              <input
                className="inline p-2 ml-2 h-8 w-8"
                type="checkbox"
                name="isFavorite"
              ></input>
            </Tooltip>
            <input
              className="block outline-gray-400 p-2 my-2 rounded-lg placeholder-gray-400 border"
              type="text"
              name="lastName"
              placeholder="Last Name"
              defaultValue={contact.lastName}
            />
          </div>

          <label htmlFor="groupId" className="text-right text-gray-400 my-auto">
            Group
          </label>
          <select
            className="block outline-gray-400 p-2 rounded-lg placeholder-gray-400 border"
            placeholder="Group"
            name="groupId"
          >
            <option value="">- Select Group -</option>
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.groupName}
              </option>
            ))}
          </select>

          <label htmlFor="company" className="text-right text-gray-400 my-auto">
            Company
          </label>
          <input
            className="block outline-gray-400 p-2 rounded-lg placeholder-gray-400 border"
            type="text"
            name="company"
            placeholder="Company"
            defaultValue={contact.company}
          />

          <label
            htmlFor="instagramUsername"
            className="text-right text-gray-400 my-auto"
          >
            Username
          </label>
          <input
            className="block outline-gray-400 p-2 rounded-lg placeholder-gray-400 border"
            type="text"
            name="instagramUsername"
            placeholder="Username"
          />

          <label htmlFor="email" className="text-right text-gray-400 my-auto">
            Email
          </label>
          <input
            className="block outline-gray-400 p-2 rounded-lg placeholder-gray-400 border"
            type="text"
            name="email"
            placeholder="Email"
            defaultValue={contact.email}
          />

          <label htmlFor="" className="text-right text-gray-400 my-auto">
            Phone
          </label>
          <input
            className="block outline-gray-400 p-2 rounded-lg placeholder-gray-400 border"
            type="text"
            name="phone"
            placeholder="Phone"
            defaultValue={contact.phone}
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="py-2 px-4 mr-2 rounded-lg bg-indigo-900 border-2 border-indigo-900 text-white"
            onClick={toggleContactModal}
          >
            Save
          </button>
          <button
            type="button"
            className="py-2 px-4 rounded-lg border-2 border-indigo-400 text-indigo-400"
            onClick={toggleContactModal}
          >
            Cancel
          </button>
        </div>
      </fieldset>
    </Form>
  </>
);
