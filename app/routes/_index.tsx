import fs from "fs";
import path from "path";
import { LoaderFunction, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async () => {
  try {
    // Works on dev (yarn dev)
    // Doesn't works on production (yarn build; npx remix-server ./build/server/index.js)
    var pa = path.resolve("./public/FranklinGothicMedium.ttf");
    fs.readFileSync(pa);
    return json({ fontLoaded: true, error: undefined });
  } catch (err) {
    console.log(err);
    return json({ fontLoaded: false, error: (err as Error).message });
  }
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <p>Font loaded server side?: {data.fontLoaded ? "YES" : "NO"}</p>
      {data.error && <p>Error: {data.error}</p>}
    </div>
  );
}
