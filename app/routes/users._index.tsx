import React from "react";
import { V2_MetaFunction, LoaderFunction, json } from "@remix-run/deno";
import { Link, useLoaderData } from "@remix-run/react";
import { User, getUsers } from "../db.server.ts";
import type { LoaderArgs } from "@remix-run/deno";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Deno KV Database" },
    { name: "Description", content: "Content" },
  ];
};

const linkStyle = {
  color: "#7ff977",
  textDecorationColor: "hotpink",
};

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return json(await getUsers());
};
export default function UsersHome() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <h3>Users list from Deno KV</h3>
      <h4>Click on the white link bellow to create a new user</h4>

      <Link to={"/users/new"} style={{ color: "white" }}>
        Create an New user
      </Link>

      <ul>
        {data.map((user: User) => (
          <li key={user.id}>
            <Link style={linkStyle} to={user.id}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
