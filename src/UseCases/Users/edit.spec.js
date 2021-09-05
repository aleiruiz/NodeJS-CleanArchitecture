import makeEditUser from "./edit";
import makeFakeUser from "../../../__test__/fixtures/entities/user";
import UserDB from "../../DataAccess/User";
import GenericsDB from "../../DataAccess/Generics";
import connectToDB from "../../../__test__/fixtures/db";

describe("edit user", () => {
  let UserDataAccess;
  let UserAccess;
  beforeAll(async () => {
    let dataAccess = await GenericsDB({ connectToDB });
    UserDataAccess = async () => await UserDB({ dataAccess });
    UserAccess = await UserDB({ dataAccess });
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
    await UserAccess.insert({ ...fakeUser });
    const edited = await editUser({ ...fakeUser, userName: "changed" });
    expect(edited).toBe(1);
    const inserted = await UserAccess.findById({ ...fakeUser });
    expect(inserted.modifiedOn).not.toBe(edited.modifiedOn);
  });
});
