import faker from "faker";
import cuid from "cuid";

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid,
});

const password = faker.internet.password();

export default function makeFakeUser(overrides) {
  const user = Object.freeze({
    id: Id.makeId(),
    email: faker.internet.email(),
    userName: faker.name.findName(),
    firstName: faker.name.findName(),
    lastName: faker.name.findName(),
    password: password,
    createdOn: Date.now(),
    modifiedOn: Date.now(),
    deletedOn: Date.now(),
  });

  return {
    ...user,
    ...overrides,
  };
}
