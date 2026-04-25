import { Inngest } from "inngest";
import { dataBaseConnection } from "../dataBase/DataBase.js";
import { User } from "../model/UserModel.js";

export const inngest = new Inngest({ id: "meeting-time" });

export const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await dataBaseConnection();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };

    await User.create(newUser);
  },
);

export const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await dataBaseConnection();

    const { id } = event.data;
    await User.deleteOne({ clerkId: id });

    // await deleteStreamUser(id.toString());
  }
);