import React from "react";
import { LoaderArgs, json, ActionArgs, redirect } from "@remix-run/deno";
import { User, createUser, deleteUserById, getUserById } from "../db.server.ts";
import { useLoaderData, Form } from "@remix-run/react";
import { ActionFunction } from "@remix-run/deno";

export const loader: LoaderArgs = async ({ params }: LoaderArgs) => {
  return json(await getUserById(params.userID));
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const { id, name, email, intent } = Object.fromEntries(formData);

  if (intent === "delete") {
    await deleteUserById(id);

    return redirect("/users");
  }

  const newUser: User = {
    id,
    name,
    email,
  };

  await createUser(newUser);

  return redirect("/users");
};

export default function UserSlug() {
  const data = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>User details</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <Form method="post">
        <input type="hidden" name="id" defaultValue={data.id} />
        <p>
          <label htmlFor="name">
            Name {""}
            <input type="text" name="name" defaultValue={data.name} />
          </label>
        </p>

        <p>
          <label htmlFor="email">
            Email {""}
            <input type="text" name="email" defaultValue={data.email} />
          </label>
        </p>

        <button type="submit" name="intent" value="submit">
          Submit
        </button>
        <button type="submit" name="intent" value="delete">
          Delete
        </button>
      </Form>
    </main>
  );
}
