import {Link} from "@remix-run/react";
import type {ActionFunction} from "@remix-run/node";
import {IoChevronBack} from "react-icons/io5";
import {useCSVReader} from 'react-papaparse';
import {useRef, useState} from "react";
// import { parse } from "~/utils/parse_vcard";
import { parse } from "vcard4";
import { Checkbox } from "@mantine/core";
import {insertContact} from "~/models/contact.server";

export const action:ActionFunction = async ({request}) => {
    const formData = await request.formData();
    let values = Object.fromEntries(formData);


    const file = new File([values.file], "fs_read.csv", {type: "text/csv"});

    console.log("values: ", values)

    return values;
}

export default function SettingsImport() {
    const { CSVReader } = useCSVReader();
    const [contacts, setContacts] = useState([]);

    const inputFile = useRef<HTMLInputElement>(null);
    const form = useRef<HTMLFormElement>(null);

    const [hasHeader, setHasHeader] = useState(false);


    return (
        <div className="px-24">
            <div className="h-24"></div>
            <Link to="../settings" className="text-indigo-500"><IoChevronBack className="inline"/> Settings</Link>
            <h1 className="text-6xl text-indigo-800 font-semibold py-3">Import Contacts</h1>
            <p className="pb-3">You can import contacts into Contactly via a .csv file.</p>


            <CSVReader
                config = {{header: hasHeader}}
                onUploadAccepted={(results: any) => {

                    setContacts(results.data)
                    console.log('---------------------------');
                    console.log(results);
                    console.log('---------------------------');
                }}
                onRemoveFile={() => setContacts([])}
            >
                {({
                      getRootProps,
                      acceptedFile,
                      getRemoveFileProps,
                  }: any) => (
                    <>
                        <div>
                            <button type='button' {...getRootProps()} className="bg-indigo-50 rounded-md hover:bg-indigo-100 px-4 py-3 text-indigo-400 font-medium">
                                Browse File
                            </button>
                            <div>
                                {/*{acceptedFile && acceptedFile.name}*/}
                            </div>
                            {/*<button {...getRemoveFileProps()}>*/}
                            {/*    Remove*/}
                            {/*</button>*/}
                        </div>
                    </>
                )}
            </CSVReader>

            <div className="flex items-center mb-4">
                <input id="default-checkbox" type="checkbox" onClick={() => setHasHeader(!hasHeader)} className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"/>
                <label htmlFor="default-checkbox" className="ml-2">Has Header</label>
            </div>


            {/*<form encType="multipart/form-data" ref={form}>*/}
            {/*    <input type="file" name="file" accept="text/x-vcard" ref={inputFile} onChange={() => {readCSV(inputFile)}}*/}
            {/*           className="hidden"></input>*/}
            {/*    <button type="button" name="_action" value="import_csv" onClick={() => inputFile.current?.click()}*/}
            {/*            className="bg-indigo-50 rounded-md hover:bg-indigo-100 px-4 py-3 text-indigo-400 font-medium">Import Contacts</button>*/}

            {/*    /!*<button type="submit" name="_action" value="import_csv" onClick={readCSV}/>*!/*/}
            {/*</form>*/}


            {contacts.length ?
                <>
                    <button type="button" onClick={() => createContacts(contacts)}
                            className="bg-indigo-50 rounded-md hover:bg-indigo-100 px-4 py-3 text-indigo-400 font-medium">
                        Save Contacts
                    </button>
                    <Table people={contacts}/>
                </> : null}

        </div>
    );
}

function createContacts(contacts) {
    contacts.map(contact => {

        // TODO matthew - need to write the code to procedurally take the contact from how it is returned to how it can be inserted into db
        const parsedContact = {

        }


        // const contact = {
        //     accountId: user.id,
        //     id,
        //     contactGroupId,
        //     firstName,
        //     lastName,
        //     email,
        //     company,
        //     phone,
        //     active: true,
        //     isFavorite,
        //     profileURL: imageUrl,
        // };

        // insertContact(parsedContact)
    })
}


function readCSV(inputFile: any) {
    // e.preventDefault();

    // console.log("cool", e.target)
    const file = inputFile.current?.files?.[0];
    console.log("file: ", file)
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result;
            if (text) {

                console.log(parse(text));
                console.log(text);
            }
        };
        reader.readAsText(file);
    }
}

// @ts-ignore
const Table = ({people}) => {
    const keys = Object.keys(people[0]);
    const filteredKeys = keys.filter((key) =>
        people.some((person) => person[key] !== '' && person[key] !== null && person[key] !== undefined)
    );

    return (
        <div className="bg-white rounded my-6">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    {filteredKeys.map((key) => (
                        <th key={key}
                            className="px-6 py-3">
                            {key}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {people.map((person, index:number) => (
                    <tr key={index} className="bg-white border-b">
                        {filteredKeys.map((key) => (
                            <td key={key} className="px-6 py-4">{person[key]}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};


