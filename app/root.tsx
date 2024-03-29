import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { MantineProvider } from "@mantine/core";

import stylesheet from "./styles/tailwind.css";

// https://remix.run/api/app#links
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Contacts",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <MantineProvider
      theme={{
        defaultRadius: 'md',
        primaryColor: 'violet',
        components: {
          Input: {
            defaultProps: {
              size: "md",
            },
          },
          Select: {
            defaultProps: {
              size: "md",
            },
          },
          ColorInput: {
            defaultProps: {
              size: "md",
            },
          },
          NumberInput: {
            defaultProps: {
              size: "md",
            },
          },
        },
      }}
    >
      <html lang="en" className="h-full">
        <head>
          <Meta />
          <Links />
        </head>
        <body className="h-full">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
