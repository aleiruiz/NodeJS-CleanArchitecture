import makeRemoveUser from "./remove";
import GenericsDB from "../../DataAccess/Generics";
import UserDB from "../../DataAccess/User";
import makeFakeUser from "../../../__test__/fixtures/entities/user";
import connectToDB from "../../../__test__/fixtures/db";

describe("remove User", () => {
  let UserDataAccess;
  let UserAccess;

  beforeAll(async () => {
    let dataAccess = await GenericsDB({ connectToDB });
    UserDataAccess = async () => await UserDB({ dataAccess });
    UserAccess = await UserDB({ dataAccess });
  });

  it("handles non existent Users", async () => {
    const removeUser = makeRemoveUser({
      UserDataAccess,
    });
    const fakeUser = makeFakeUser();
    const expected = {
      deletedCount: 0,
      softDelete: false,
      message: "User not found, nothing to delete.",
    };
    const actual = await removeUser({ id: fakeUser.id });
    expect(actual).toEqual(expected);
  });

  it("deletes Users", async () => {
    const removeUser = makeRemoveUser({
      UserDataAccess,
    });

    const fakeUser = makeFakeUser();
    await UserAccess.insert({ ...fakeUser });

    const found = await UserAccess.findById({ id: fakeUser.id });
    expect(found).toMatchObject(fakeUser);

    const expected = {
      deletedCount: 1,
      softDelete: false,
      message: "User deleted.",
    };

    const actual = await removeUser({ id: fakeUser.id });
    expect(actual).toMatchObject(expected);

    const notFound = await UserAccess.findById({ id: fakeUser.id });
    expect(notFound).toBe(null);
  });
});
