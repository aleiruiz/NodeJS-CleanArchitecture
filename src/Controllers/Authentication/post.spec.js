import makePostUser from "../Users/post";
import trans from "../../Localization";
import makeLogin from "./post";
import makeFakeUser from "../../../__test__/fixtures/entities/user";

describe("Login User controller", () => {
  it("successfully logins a User", async () => {
    const postUser = makePostUser({
      addUser: (c) => c,
    });
    const loginUser = makeLogin({
      login: (c) => c,
    });
    const user = makeFakeUser();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      trans: trans.__,
      body: user,
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: { ...request.body },
    };
    await postUser(request);
    const actual = await loginUser(request);
    expect(actual).toEqual(expected);
  });
});
