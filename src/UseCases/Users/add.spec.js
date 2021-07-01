import makeAddUser from "./add";
import makeFakeUser from "../../../__test__/fixtures/entities/user";
import connectToDB from "../../../__test__/fixtures/db";
import UserDB from "../../DataAccess/User";

describe("add user", () => {
  let UserDataAccess;
  beforeAll(async () => {
    UserDataAccess = async () => await UserDB({ connectToDB });
  });

  it("inserts users in the database", async () => {
    const newUser = makeFakeUser();
    const addUser = makeAddUser({
      UserDataAccess,
    });
    const inserted = await addUser({
      ...newUser,
      confirmPassword: newUser.password,
    });
    expect(inserted).toMatchObject({
      ...newUser,
      password: inserted.password,
      id: newUser.id,
    });
  });
});
