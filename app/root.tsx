import { LinksFunction, MetaFunction, json, useLoaderData } from "remix";
import {
  Scripts,
  Links,
  Outlet,
  useCatch,
  Meta,
} from "remix";
import { CameraProvider } from "./hooks/contextProvider/camera";
import { UserContextProvider } from "./hooks/useSupabaseUser";
import almondStylesUrl from "~/styles/almond.css";
import resetStylesUrl from "~/styles/reset.css";
import RouteChangeAnnouncement from "./components/routeChangeAnnoucement";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: resetStylesUrl,
    },
    {
      rel: "stylesheet",
      href: almondStylesUrl,
    },
  ];
};

export async function loader() {
  return json({
    ENV: {
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      SKYWAY_APIKEY,
      ENVIRONMENT
    },
  });
}

export const meta: MetaFunction = () => {
  const description = `自宅で集中するには集中できRoom`;
  return {
    description,
    keywords: "集中できRoom",
    "twitter:image": "https://remix-jokes.lol/social.png",
    "twitter:card": "summary_large_image",
    "twitter:creator": "@remix_run",
    "twitter:site": "@remix_run",
    "twitter:title": "Remix Jokes",
    "twitter:description": description,
  };
};

function Document({
  children,
  title = `集中できRoom`,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <Meta />
        <title>{title}</title>
        <Links />
      </head>
      <body id="__remix">
        {children}
        <RouteChangeAnnouncement />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData();
  return (
    <Document>
      <CameraProvider>
        <UserContextProvider>
          <Outlet />
        </UserContextProvider>
      </CameraProvider>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
        }}
      />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="error-container">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="エラーが発生しました">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
