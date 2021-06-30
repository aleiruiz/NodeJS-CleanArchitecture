import makeEditUser from "./edit";
import makeFakeUser from "../../../__test__/fixtures/entities/user";
import UserDataAccess from "../../DataAccess/User";
import connectToDB from "../../../__test__/fixtures/db";

describe("edit user", () => {
  let usersDb;
  beforeAll(async () => {
    usersDb = await UserDataAccess({ connectToDB });
  });
  it("must include an id", () => {
    const editUser = makeEditUser({
      usersDb: {
        update: () => {
          throw new Error("update should not have been called");
        },
      },
    });
    const userToEdit = makeFakeUser({ id: undefined });
    expect(editUser(userToEdit)).rejects.toThrow("You must supply an id.");
  });
  it("modifies a user", async () => {
    const editUser = makeEditUser({
      usersDb,
    });
    const fakeUser = makeFakeUser({
      modifiedOn: undefined,
    });
    const inserted = await usersDb.insert({ userInfo: fakeUser });
    const edited = await editUser({ ...fakeUser, userName: "changed" });
    expect(edited.userName).toBe("changed");
    expect(inserted.modifiedOn).not.toBe(edited.modifiedOn);
  });
});
