import makeRemoveUser from "./remove";
import UserDataAccess from "../../DataAccess/User";
import makeFakeUser from "../../../__test__/fixtures/entities/user";
import connectToDB from "../../../__test__/fixtures/db";

describe("remove User", () => {
  let usersDb;

  beforeAll(async () => {
    usersDb = await UserDataAccess({ connectToDB });
  });

  it("handles non existent Users", async () => {
    const removeUser = makeRemoveUser({
      usersDb,
    });
    const fakeUser = makeFakeUser();
    const expected = {
      deletedCount: 0,
      softDelete: false,
      message: "User not found, nothing to delete.",
    };
    const actual = await removeUser(fakeUser);
    expect(actual).toEqual(expected);
  });

  it("deletes Users", async () => {
    const removeUser = makeRemoveUser({
      usersDb,
    });

    const fakeUser = makeFakeUser();
    await usersDb.insert({ userInfo: fakeUser });

    const found = await usersDb.findById(fakeUser.id);
    expect(found).toEqual({
      ...fakeUser,
      _id: found._id,
      password: found.password,
    });

    const expected = {
      deletedCount: 1,
      softDelete: false,
      message: "User deleted.",
    };

    const actual = await removeUser({ id: fakeUser.id });
    expect(actual).toEqual(expected);

    const notFound = await usersDb.findById(fakeUser.id);
    expect(notFound).toBe(null);
  });
});
