import makeFakeUser from "../../../__test__/fixtures/entities/user";
import { default as Entities } from "../index";
const { User } = Entities;

describe("user", () => {
  it("must have an email", () => {
    const user = makeFakeUser({ email: null });
    expect(() => User(user)).toThrow("User must have a valid email.");
  });

  it("must have a valid userName", () => {
    const user = makeFakeUser({ userName: null });
    expect(() => User(user)).toThrow("User must have a valid name.");
  });
  it("must have valid name", () => {
    const user = makeFakeUser({ firstName: null });
    expect(() => User(user)).toThrow(
      "User must have a valid first and last name."
    );
  });

  it("must have valid last name", () => {
    const user = makeFakeUser({ lastName: null });
    expect(() => User(user)).toThrow(
      "User must have a valid first and last name."
    );
  });

  it("must have valid password", () => {
    const user = makeFakeUser({ password: `12345` });
    expect(() => User(user)).toThrow(
      "User must have a valid password, please make sure to make the password at least 6 characters."
    );
  });

  it("can have an id", () => {
    const user = makeFakeUser({ id: "invalid" });
    expect(() => User(user)).toThrow("User must have a valid id.");
    const noId = makeFakeUser({ id: undefined });
    expect(() => User(noId)).not.toThrow();
  });

  it("is createdOn now in UTC", () => {
    const noCreationDate = makeFakeUser({ createdOn: undefined });
    expect(noCreationDate.createdOn).not.toBeDefined();
    const d = User(noCreationDate).getCreatedOn();
    expect(d).toBeDefined();
    expect(new Date(d).toUTCString().substring(26)).toBe("GMT");
  });
  it("is modifiedOn now in UTC", () => {
    const noModifiedOnDate = makeFakeUser({ modifiedOn: undefined });
    expect(noModifiedOnDate.modifiedOn).not.toBeDefined();
    const d = User(noModifiedOnDate).getCreatedOn();
    expect(d).toBeDefined();
    expect(new Date(d).toUTCString().substring(26)).toBe("GMT");
  });
});
