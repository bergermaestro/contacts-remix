import {redirect} from '@remix-run/node'
import type {ActionFunction, LoaderFunction} from 'remix'

export let loader: LoaderFunction = () => redirect('/login')

export let action: ActionFunction = ({request}) => {

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'matthew.berger@uwaterloo.ca', // Change to your recipient
        from: 'matthew17berger@gmail.com', // Change to your verified sender
        subject: 'Contactly Weekly Digest',
        template_id: "d-a60310bb310e4502a092c3f31e1ff250",
        dynamic_template_data: {
            "first_name": "Matthew",
            "last_name": "Berger",
            "upcoming_contacts":
                [
                    {
                        "first_name": "Floyd",
                        "last_name": "Miles",
                        "contact_on": "Wednesday",
                        "contact_group": "Friends"
                    },
                    {
                        "first_name": "Kathryn",
                        "last_name": "Murphy",
                        "contact_on": "Wednesday",
                        "contact_group": "Friends"
                    },
                    {
                        "first_name": "Darrel",
                        "last_name": "Steward",
                        "contact_on": "Thursday",
                        "contact_group": "Acquaintances"
                    }]
        }
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error: Error) => {
            console.error(error)
        })

    return null;
}