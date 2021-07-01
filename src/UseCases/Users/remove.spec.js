import makeRemoveUser from "./remove";
import UserDB from "../../DataAccess/User";
import makeFakeUser from "../../../__test__/fixtures/entities/user";
import connectToDB from "../../../__test__/fixtures/db";

describe("remove User", () => {
  let UserDataAccess;
  let UserAccess;

  beforeAll(async () => {
    (UserDataAccess = async () => await UserDB({ connectToDB })),
      (UserAccess = await UserDB({ connectToDB }));
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
    const actual = await removeUser(fakeUser);
    expect(actual).toEqual(expected);
  });

  it("deletes Users", async () => {
    const removeUser = makeRemoveUser({
      UserDataAccess,
    });

    const fakeUser = makeFakeUser();
    await UserAccess.insert({ userInfo: fakeUser });

    const found = await UserAccess.findById(fakeUser.id);
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

    const notFound = await UserAccess.findById(fakeUser.id);
    expect(notFound).toBe(null);
  });
});
