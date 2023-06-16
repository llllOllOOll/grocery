interface User {
  id: string;
  username: string;
  email: string;
  name: string;
}

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
}

const newUser: User = {
  id: crypto.randomUUID(),
  username: "seven",
  email: "seven@run",
  name: "Seven",
};

const newAddress: Address = {
  id: crypto.randomUUID(),
  street: "123 Main St",
  city: "New York",
  state: "NY",
  zipcode: "10001",
};
//const user: User = (await db.get<User>(["users", "1"])).value!;
//await db.set(["users_by_email",newUser.email],newUser)

export async function upsertUser(user: User) {
  const userKey = ["user", user.id];
  const userByEmailKey = ["user_by_email", user.email];

  const oldUser = await db.get<User>(userKey);

  if (!oldUser.value) {
    const ok = await db
      .atomic()
      .check(oldUser)
      .set(userByEmailKey, user.id)
      .set(userKey, user)
      .commit();
    if (!ok) throw new Error("Something went wrong.");
  } else {
    const ok = await db
      .atomic()
      .check(oldUser)
      .delete(["user_by_email", oldUser.value.email])
      .set(userByEmailKey, user.id)
      .set(userKey, user)
      .commit();
    if (!ok) throw new Error("Something went wrong.");
  }
}

const db = await Deno.openKv("./users.db");

//await db.set(["user"], { name: "Luna", email: "seven@gmail.com" });
//await db.set(["user", "seven@gmail.com"], {
///  name: "Luna",
//  email: "seven@gmail.com",
//});
type Users = {
  id: string;
  name: string;
  email: string;
};
const userByEmail = await db.set(["users_by_email", "alan@turing.com"], {
  id: 1,
});

const userById = (await db.get(["users_by_email", "1"])).value;
console.log(userById);
