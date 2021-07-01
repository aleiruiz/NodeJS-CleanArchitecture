import makeEditUser from "./edit";
import makeFakeUser from "../../../__test__/fixtures/entities/user";
import UserDB from "../../DataAccess/User";
import connectToDB from "../../../__test__/fixtures/db";

describe("edit user", () => {
  let UserDataAccess;
  let UserAccess;
  beforeAll(async () => {
    UserDataAccess = async () => await UserDB({ connectToDB });
    UserAccess = await UserDB({ connectToDB });
  });
  it("must include an id", () => {
    const editUser = makeEditUser({
      UserDataAccess: {
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
      UserDataAccess,
    });
    const fakeUser = makeFakeUser({
      modifiedOn: undefined,
    });
    const inserted = await UserAccess.insert({ userInfo: fakeUser });
    const edited = await editUser({ ...fakeUser, userName: "changed" });
    expect(edited.userName).toBe("changed");
    expect(inserted.modifiedOn).not.toBe(edited.modifiedOn);
  });
});
