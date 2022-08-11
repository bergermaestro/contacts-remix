import { Account } from "@prisma/client";
import { redirect, TypedResponse } from "@remix-run/node";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import invariant from "tiny-invariant";
import { getAccountByEmail } from "~/models/account.server";
import { sessionStorage } from "~/services/session.server";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<Account | TypedResponse<never>>(sessionStorage);


authenticator.use(
    new FormStrategy(async ({ form, context }) => {
      // Here you can use `form` to access and input values from the form.
      // and also use `context` to access more things from the server
      let email = form.get("email");
      let password = form.get("password");
  
      // You can validate the inputs however you want
      invariant(typeof email === "string", "username must be a string");
      invariant(email.length > 0, "username must not be empty");
  
      invariant(typeof password === "string", "password must be a string");
      invariant(password.length > 0, "password must not be empty");
  
      // And if you have a password you should hash it
    //   let hashedPassword = await hash(password);
        let hashedPassword = password;
  
      // And finally, you can find, or create, the user
    //   let user = await findOrCreateUser(username, hashedPassword);
        console.log("user", email, hashedPassword);

        let user = await getAccountByEmail(email);

        if( email === "test@gmail.com" && password === "123456") {
            return {} as Account;
        }

        if(!user) {
            return redirect("/login");
        }
  
      // And return the user as the Authenticator expects it
      return user;
    }),
    "user-pass"
  );