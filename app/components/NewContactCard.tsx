const NewContactCard = () => {
  return (
    <form className="bg-indigo-100 h-3/5 py-24 px-12 ml-24 my-auto rounded-lg text-indigo-800">
        <input className="block outline-indigo-900 bg-indigo-000 p-2 my-2 rounded-lg placeholder-indigo-400 outline-2 text-2xl"type="text" name='first_name' placeholder="First Name"/>
        <input className="block outline-indigo-900 bg-indigo-000 p-2 my-2 rounded-lg placeholder-indigo-400 border-2 text-2xl"type="text" name='last_name' placeholder="Last Name"/>
        <input className="block outline-indigo-900 bg-indigo-000 p-2 my-2 rounded-lg placeholder-indigo-400 border-2"type="text" name='company' placeholder="Company"/>

        <fieldset className="mt-12">
          <h3 className="text-2xl font-bold">Quick Info</h3>
          <input className="block outline-indigo-900 bg-indigo-000 p-2 my-2 rounded-lg placeholder-indigo-400 border-2"type="text" name='instagram_username' placeholder="Username"/>
          <input className="block outline-indigo-900 bg-indigo-000 p-2 my-2 rounded-lg placeholder-indigo-400 border-2"type="text" name='email' placeholder="Email"/>
          <input className="block outline-indigo-900 bg-indigo-000 p-2 my-2 rounded-lg placeholder-indigo-400 border-2"type="text" name='phone_number' placeholder="Phone Number"/>
        </fieldset>

        <button className="py-2 px-4 mr-4 rounded-lg bg-indigo-900 border-2 border-indigo-900 text-white">Save</button>
        <button className="py-2 px-4 rounded-lg border-2 border-indigo-900">Cancel</button>

        
    </form>
  )
}

export default NewContactCard