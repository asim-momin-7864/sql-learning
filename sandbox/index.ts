import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
const db = drizzle(process.env.DATABASE_URL!);

//
import { eq } from "drizzle-orm";
import { usersTable } from "./schema.js";

// trust
async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    age: 30,
    email: "john12@gamil.com",
  };

  //   await db.insert(usersTable).values(user);
  //   console.log("New user created");

  // const users = await db.select().from(usersTable);
  // console.log("Getting all users from the database: ", users);

  // update
  //   const updatedUser = await db
  //     .update(usersTable)
  //     .set({
  //       age: 33,
  //     })
  //     .where(eq(usersTable.email, "john12@gamil.com"))
  //     .returning();
  //   console.log("User info updated!!", updatedUser);

  // delete
  const deletedUser = await db
    .delete(usersTable)
    .where(eq(usersTable.email, "john12@gamil.com"))
    .returning();

  console.log("successfully deleted", deletedUser);
}
main();
