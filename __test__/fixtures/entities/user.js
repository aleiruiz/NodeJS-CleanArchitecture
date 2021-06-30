import faker from "faker";
import cuid from "cuid";
import crypto from "crypto";

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid,
});

const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

const salt = generateSalt();
const password = faker.internet.password();

export default function makeFakeUser(overrides) {
  const user = {
    id: Id.makeId(),
    email: faker.internet.email(),
    userName: faker.name.findName(),
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    password: password,
    salt: salt,
    createdOn: Date.now(),
    modifiedOn: Date.now(),
    deletedOn: Date.now(),
  };

  return {
    ...user,
    ...overrides,
  };
}
