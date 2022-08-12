import { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react"

const NewContactCard = () => {
  return (
    <Form method="post" className="bg-indigo-100 h-3/5 py-24 px-12 ml-24 my-auto rounded-lg text-indigo-800">
        <input className="block outline-indigo-900 bg-indigo-000 p-2 my-2 rounded-lg placeholder-indigo-400 outline-2 text-2xl"type="text" name='firstName' placeholder="First Name"/>
        <input className="block outline-indigo-900 bg-indigo-000 p-2 my-2 rounded-lg placeholder-indigo-400 border-2 text-2xl"type="text" name='lastName' placeholder="Last Name"/>
        <input className="block outline-indigo-900 bg-indigo-000 p-2 my-2 rounded-lg placeholder-indigo-400 border-2"type="text" name='company' placeholder="Company"/>

        <div className="mt-12">
          <h3 className="text-2xl font-bold">Quick Info</h3>
          <input className="block outline-indigo-900 bg-indigo-000 p-2 my-2 rounded-lg placeholder-indigo-400 border-2"type="text" name='instagramUsername' placeholder="Username"/>
          <input className="block outline-indigo-900 bg-indigo-000 p-2 my-2 rounded-lg placeholder-indigo-400 border-2"type="text" name='email' placeholder="Email"/>
          <input className="block outline-indigo-900 bg-indigo-000 p-2 my-2 rounded-lg placeholder-indigo-400 border-2"type="text" name='phone' placeholder="Phone Number"/>
        </div>

        <button type="submit" className="py-2 px-4 mr-4 rounded-lg bg-indigo-900 border-2 border-indigo-900 text-white">Save</button>
        <button className="py-2 px-4 rounded-lg border-2 border-indigo-900">Cancel</button> 
    </Form>
  )
}

export default NewContactCard