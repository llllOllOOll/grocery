import * as React from "react";

import type { V2_MetaFunction } from "@remix-run/deno";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix DENO KV Database" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <h1>Deno KV / REMIX</h1>
    </>
  );
}
