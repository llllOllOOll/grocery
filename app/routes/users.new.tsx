import React from "react";
import { ActionArgs, redirect } from "@remix-run/deno";
import { ActionFunction } from "@remix-run/deno";
import { Form } from "@remix-run/react";
import { User, createUser } from "../db.server.ts";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const { name, email } = Object.fromEntries(formData);

  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
  };

  await createUser(newUser);

  return redirect("/users");
};

export default function CreateUser() {
  return (
    <main>
      <h1>Create User </h1>

      <Form method="post">
        <p>
          <label htmlFor="name">
            Name {""}
            <input type="text" name="name" />
          </label>
        </p>

        <p>
          <label htmlFor="email">
            Email {""}
            <input type="text" name="email" />
          </label>
        </p>

        <button type="submit">Submit</button>
      </Form>
    </main>
  );
}
