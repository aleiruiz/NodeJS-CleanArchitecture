import connectToDB from "../../../__test__/fixtures/db";
import UserDataAccess from "./index";
import GenericsDB from "../Generics";
import makeFakeUser from "../../../__test__/fixtures/entities/user";

describe("users db", () => {
  let usersDb;

  beforeEach(async () => {
    let dataAccess = await GenericsDB({ connectToDB });
    usersDb = await UserDataAccess({ dataAccess });
  });

  it("inserts a user", async () => {
    const user = makeFakeUser();
    const result = await usersDb.insert({ ...user });
    return expect({
      ...result,
      ...user,
    }).toMatchObject(user);
  });

  it("finds a user by id", async () => {
    const user = makeFakeUser();
    await usersDb.insert({ ...user });
    const found = await usersDb.findById({ ...user });
    expect(found).toMatchObject(user);
  });

  it("updates a user", async () => {
    const user = makeFakeUser();
    await usersDb.insert({ ...user });
    user.userName = "changed";
    const updated = await usersDb.update({ ...user });
    expect(updated).toBe(1);
    const inserted = await usersDb.findById({ ...user });
    expect(inserted.userName).toBe("changed");
  });

  it("deletes a user", async () => {
    const user = makeFakeUser();
    await usersDb.insert({ ...user });
    return expect(await usersDb.remove(user)).toBe(1);
  });
});
