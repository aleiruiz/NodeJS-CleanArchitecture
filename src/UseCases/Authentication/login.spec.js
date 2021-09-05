import makeAddUser from "../Users/add";
import makeLogin from "./login";
import makeFakeUser from "../../../__test__/fixtures/entities/user";
import { hashUtilities, jwtUtilities } from "../../Utilities";
import connectToDB from "../../../__test__/fixtures/db";
import UserDB from "../../DataAccess/User";
import GenericsDB from "../../DataAccess/Generics";

describe("login user", () => {
  let UserDataAccess;
  beforeAll(async () => {
    let dataAccess = await GenericsDB({ connectToDB });
    UserDataAccess = async () => await UserDB({ dataAccess });
  });

  it("login users", async () => {
    const newUser = makeFakeUser();
    const addUser = makeAddUser({
      UserDataAccess,
      hashUtilities,
    });
    const loginUser = makeLogin({
      UserDataAccess,
      jwtUtilities,
    });

    await addUser({
      ...newUser,
      confirmPassword: newUser.password,
    });

    const login = await loginUser(newUser);

    expect(login).toHaveProperty("token");
  });
});
