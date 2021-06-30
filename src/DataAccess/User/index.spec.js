import connectToDB from "../../../__test__/fixtures/db";
import UserDataAccess from "./index";
import makeFakeUser from "../../../__test__/fixtures/entities/user";

describe("users db", () => {
  let usersDb;

  beforeEach(async () => {
    usersDb = await UserDataAccess({ connectToDB });
  });

  it("lists users", async () => {
    const inserts = await Promise.all(
      [makeFakeUser(), makeFakeUser(), makeFakeUser()].map((fakeUser) =>
        usersDb.insert({ userInfo: fakeUser })
      )
    );
    const found = await usersDb.findAll();
    expect.assertions(inserts.length);
    return inserts.forEach((insert) => expect(found).toContainEqual(insert));
  });

  it("inserts a user", async () => {
    const user = makeFakeUser();
    const result = await usersDb.insert({ userInfo: user });
    return expect({
      ...result,
      password: user.password,
      confirmPassword: user.confirmPassword,
    }).toEqual(user);
  });

  it("finds a user by id", async () => {
    const user = makeFakeUser();
    await usersDb.insert({ userInfo: user });
    const found = await usersDb.findById(user.id);
    expect({ ...found, password: user.password }).toEqual({
      ...user,
      _id: found._id,
    });
  });

  it("updates a user", async () => {
    const user = makeFakeUser();
    await usersDb.insert({ userInfo: user });
    user.userName = "changed";
    const updated = await usersDb.update(user);
    return expect(updated.userName).toBe("changed");
  });

  it("deletes a user", async () => {
    const user = makeFakeUser();
    await usersDb.insert({ userInfo: user });
    return expect(await usersDb.remove(user)).toBe(1);
  });
});
