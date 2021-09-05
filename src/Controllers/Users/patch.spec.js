import makePatchUser from "./patch";
import makeFakeUser from "../../../__test__/fixtures/entities/user";

describe("patch User controller", () => {
  it("successfully patches a User", async () => {
    const fakeUser = makeFakeUser();
    const patchUser = makePatchUser({
      editUser: (c) => {
        return { ...c };
      },
    });
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        id: fakeUser.id,
      },
      body: { ...fakeUser },
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
        "Last-Modified": new Date(fakeUser.modifiedOn).toUTCString(),
      },
      statusCode: 200,
      body: { ...fakeUser },
    };
    const actual = await patchUser(request);
    expect(actual).toMatchObject(expected);
  });
  it("reports user errors", async () => {
    const fakeUser = makeFakeUser();
    const patchUser = makePatchUser({
      editUser: () => {
        throw Error("Pow!");
      },
    });
    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        id: fakeUser.id,
      },
      body: fakeUser,
    };
    const expected = {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 400,
      body: { error: "Pow!" },
    };
    const actual = await patchUser(request);
    expect(actual).toEqual(expected);
  });
});
