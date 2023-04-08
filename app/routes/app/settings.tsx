import type {ActionFunction, LoaderFunction} from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import {Form, Link} from "@remix-run/react";
import {useRef} from "react";

export let loader: LoaderFunction = async ({ request }) => {

  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
  });
};

export const action:ActionFunction = async ({request}) => {
    const formData = await request.formData();
    let values = Object.fromEntries(formData);

    console.log("values: ", values)

    return values;
}


export default function Settings() {

    return (
        <div className="px-24">
            <h1 className="text-6xl text-indigo-800 font-semibold pt-24 pb-3">Settings</h1>

            <h2 className="text-4xl text-indigo-800 font-semibold pt-12 pb-3">Reminder Emails</h2>
            <Form action="/api/send_email" method="post">
                <button type="submit"
                        className="bg-indigo-50 rounded-md hover:bg-indigo-100 px-4 py-3 text-indigo-400 font-medium">Send
                    Email
                </button>
            </Form>

            <h2 className="text-4xl text-indigo-800 font-semibold pt-12 pb-3"> Import Contacts </h2>
            <p className="pb-3">You can import contacts into Contactly via a .csv file.</p>
            <Link to="./import" className="bg-indigo-50 rounded-md hover:bg-indigo-100 px-4 py-3 text-indigo-400 font-medium">Import Page</Link>
        </div>
    );
}