import makeFakeUser from "../../../__test__/fixtures/entities/user";
import { User } from "../index";

describe("user", () => {
  it("must have an email", () => {
    const user = User(makeFakeUser({ email: null }));
    expect(() => user.validate()).toThrow("user_email_invalid");
  });

  it("must have a valid userName", () => {
    const user = User(makeFakeUser({ userName: null }));
    expect(() => user.validate()).toThrow("user_username_invalid");
  });
  it("must have valid name", () => {
    const user = User(makeFakeUser({ firstName: null }));
    expect(() => user.validate()).toThrow("user_name_invalid");
  });

  it("must have valid last name", () => {
    const user = User(makeFakeUser({ lastName: null }));
    expect(() => user.validate()).toThrow("user_name_invalid");
  });

  it("can have an id", () => {
    const user = User(makeFakeUser({ id: "invalid" }));
    expect(() => user.validate()).toThrow("user_id_invalid");
    const noId = User(makeFakeUser({ id: undefined }));
    expect(() => noId.validate()).not.toThrow();
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
