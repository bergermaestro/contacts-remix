import { Input, Select, Tooltip } from "@mantine/core";
import { ContactGroup } from "@prisma/client";
import { Form } from "@remix-run/react";
import { IoPeopleOutline } from "react-icons/io5";
import { BsBuilding } from "react-icons/bs";

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
            <Input
              sx={{ display: 'inline' }}
              name="firstName"
              placeholder="First Name"
              radius="md"
              defaultValue={contact.firstName}
            />
            <Tooltip label="Favorite this Contact" color="gray" withArrow>
              <input
                className="inline p-2 ml-2 h-8 w-8"
                type="checkbox"
                name="isFavorite"
              ></input>
            </Tooltip>
            <Input
              name="lastName"
              placeholder="Last Name"
              radius="md"
              defaultValue={contact.lastName}
            />
          </div>

          <label htmlFor="groupId" className="text-right text-gray-400 my-auto">
            Group
          </label>
          <Select
              icon={<IoPeopleOutline />}
              name="groupId"
              radius="md"
              defaultValue={contact.firstName}
              data={ groups.map((group) => ({value: group.id, label: group.groupName})) }
            />

          <label htmlFor="company" className="text-right text-gray-400 my-auto">
            Company
          </label>
          <Input
              icon={<BsBuilding />}
              name="company"
              radius="md"
              defaultValue={contact.company}
          />

          <label
            htmlFor="instagramUsername"
            className="text-right text-gray-400 my-auto"
          >
            Username
          </label>
          <Input
              name="instagramUsername"
              radius="md"
          />

          <label htmlFor="email" className="text-right text-gray-400 my-auto">
            Email
          </label>
          <Input
              icon="@"
              name="email"
              radius="md"
              defaultValue={contact.email}
          />

          <label htmlFor="" className="text-right text-gray-400 my-auto">
            Phone
          </label>
          <Input
              icon="#"
              name="phone"
              radius="md"
              defaultValue={contact.phone}
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="py-2 px-4 mr-2 rounded-lg bg-indigo-900 border-2 border-indigo-900 text-white"
            // onClick={toggleContactModal}
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
