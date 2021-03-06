import makePostUser from "./post";
import trans from "../../Localization";
import makeFakeUser from "../../../__test__/fixtures/entities/user";

describe("post User controller", () => {
  it("successfully posts a User", async () => {
    const postUser = makePostUser({
      addUser: (c) => c,
    });
    const user = makeFakeUser();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      body: user,
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
        "Last-Modified": new Date(request.body.modifiedOn).toUTCString(),
      },
      statusCode: 200,
      body: { ...request.body },
    };
    const actual = await postUser(request);
    expect(actual).toMatchObject(expected);
  });
  it("reports user errors", async () => {
    const postUser = makePostUser({
      addUser: () => {
        throw Error("Pow!");
      },
    });
    const fakeUser = makeFakeUser();
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      trans: trans.__,
      body: fakeUser,
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: { error: "Pow!" },
    };
    const actual = await postUser(request);
    expect(actual).toEqual(expected);
  });
});
