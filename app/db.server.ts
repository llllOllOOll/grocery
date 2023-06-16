export interface User {
  id: string;
  name: string;
  email: string;
}

const db = await Deno.openKv();

export const getUsers = async () => {
  const users: User[] = [];
  const iter = await db.list({ prefix: ["users"] });

  for await (const user of iter) {
    users.push(user.value as User);
  }

  return users;
};

export const getUserByEmail = async (email: string) => {
  const userEmailKey = ["users_by_email", email];
  return (await db.get<User>(userEmailKey)).value;
};

export const getUserById = async (id: string) => {
  const userKey = ["users", id];
  return (await db.get<User>(userKey)).value;
};

export const createUser = async (user: User) => {
  const userKey = ["users", user.id];
  const userByEmailKey = ["users_by_email", user.email];

  const res = await db.get<User>(userKey);

  if (!res.value) {
    const success = await db
      .atomic()
      .check(res)
      .set(userByEmailKey, user.id)
      .set(userKey, user)
      .commit();
    if (!success) throw new Error("Something went wrong!");
  } else {
    const success = await db
      .atomic()
      .check(res)
      .delete(["users_by_email", res.value.email])
      .set(userByEmailKey, user.id)
      .set(userKey, user)
      .commit();

    if (!success) throw new Error("Something went wrong!");
  }
};

export async function deleteUserById(id: string) {
  const userKey = ["users", id];
  const userRes = await db.get<User>(userKey);

  if (!userRes.value) return;

  const userByEmailKey = ["users_by_email", userRes.value.email];

  const success = await db
    .atomic()
    .check(userRes)
    .delete(userKey)
    .delete(userByEmailKey)
    .commit();

  if (!success) throw new Error("Something went wrong!");
}
