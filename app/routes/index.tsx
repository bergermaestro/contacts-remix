import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "superjson-remix";
import { authenticator } from "~/services/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
};

export const action: ActionFunction = async ({ request }) => {
    console.log("attemping logout");
    await authenticator.logout(request, { redirectTo: "/login" });
  };

export default function HomePage() {
    const data = useLoaderData();
    console.log("data", data);
    return (
      <div>
          <h1>Index Page</h1>
      </div>
    );
  }