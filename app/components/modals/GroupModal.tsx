import {Form} from "@remix-run/react";
import {ColorInput, Input, NumberInput, Select} from "@mantine/core";
import {IoPeopleOutline} from "react-icons/io5";
import {BsClock} from "react-icons/bs";

export const NewGroupModal = ({toggleGroupModal, group}: { toggleGroupModal: VoidFunction, group?:any }) => (
    <>
        <Form method="post" reloadDocument>
            <input readOnly hidden name="action" value="addGroup"></input>
            <div className="grid w-3/4 gap-2 grid-cols-[1fr_3fr]">
                <label htmlFor="frequency" className="text-right text-gray-400 my-auto">Group Name</label>
                <Input
                    icon={<IoPeopleOutline/>}
                    name="groupName"
                    radius="md"
                    defaultValue={group?.groupName}
                />

                <label htmlFor="frequency" className="text-right text-gray-400 my-auto">Frequency</label>
                <div className="flex overflow-scroll">
                    <NumberInput
                        sx={{'border-radius': 0}}
                        icon={<BsClock/>}
                        name="contactFrequency"
                        radius="md"
                        defaultValue={group?.contactFrequency}
                        rightSection={<p></p>}
                    />
                    <Select
                        defaultValue="Days"
                        name="contactFrequencyUnit"
                        data={[
                            {value: 'days', label: 'Days'},
                            {value: 'weeks', label: 'Weeks'},
                            {value: 'months', label: 'Months'},
                            {value: 'years', label: 'Years'},
                        ]}
                    />
                </div>

                <label className="text-right text-gray-400 my-auto">Group Color</label>
                <ColorInput
                    name="color"
                    disallowInput
                    withPicker={false}
                    swatchesPerRow={7}
                    radius="md"
                    swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                    defaultValue={"#" + group?.color}
                />
            </div>

            <div className="flex space-x-4">
            </div>
            <div className="mt-6">
                <button type="submit"
                        className="py-2 px-4 mr-2 rounded-lg bg-indigo-900 border-2 border-indigo-900 text-white"
                        onClick={toggleGroupModal}>Save
                </button>
                <button type="button" className="py-2 px-4 rounded-lg border-2 border-indigo-400 text-indigo-400"
                        onClick={toggleGroupModal}>Cancel
                </button>
            </div>
        </Form>
    </>
);