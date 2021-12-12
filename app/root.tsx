import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { LinksFunction } from "remix";
import { Box, Menu } from "~/components";
import tailwindStyles from "~/styles/tailwind.css";
import highlightStyles from "../node_modules/highlight.js/styles/monokai.css";
import { RemixIcon, TailwindIcon } from "~/icons";

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: tailwindStyles,
    },
    {
      rel: "stylesheet",
      href: highlightStyles,
    },
  ];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box className="min-h-screen">
      <Menu
        items={[
          { text: "Flow App", url: "/docs/packages/react-flow-app" },
          { text: "Light Form", url: "/docs/packages/react-light-form" },
          { text: "About", url: "/about" },
        ]}
      />
      <Box className="p-4 lg:p-12 flex-grow">{children}</Box>
      <Box className="bg-indigo-300 text-center w-full p-4 text-white text-xl">
        <Box>Powered by</Box>
        <Box row className="justify-center pt-4">
          <Box className="w-32 justify-center items-center">
            <RemixIcon />
          </Box>
          <Box className="w-32 justify-center items-center">
            <TailwindIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
