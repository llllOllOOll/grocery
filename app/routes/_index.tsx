import * as React from "react";

import type { V2_MetaFunction } from "@remix-run/deno";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <h1>HEllo</h1>
      <p>Text paragraph</p>
    </>
  );
}
