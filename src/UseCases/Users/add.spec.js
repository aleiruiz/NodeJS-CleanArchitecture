import makeAddUser from "./add";
import makeFakeUser from "../../../__test__/fixtures/entities/user";
import { hashUtilities } from "../../Utilities";
import connectToDB from "../../../__test__/fixtures/db";
import UserDB from "../../DataAccess/User";
import GenericsDB from "../../DataAccess/Generics";

describe("add user", () => {
  let UserDataAccess;
  beforeAll(async () => {
    let dataAccess = await GenericsDB({ connectToDB });
    UserDataAccess = async () => await UserDB({ dataAccess });
  });

  it("inserts users in the database", async () => {
    const newUser = makeFakeUser();
    const addUser = makeAddUser({
      UserDataAccess,
      hashUtilities,
    });
    const inserted = await addUser({
      ...newUser,
      confirmPassword: newUser.password,
    });
    expect(inserted).toMatchObject({
      ...newUser,
      password: inserted.password,
      salt: inserted.salt,
    });
  });
});
