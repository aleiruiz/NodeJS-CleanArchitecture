import { User } from "../../Entities";

export default async function UserDataAccess({ dataAccess }) {
  const db = dataAccess({ tableName: "user" });

  return Object.freeze({
    find,
    findOne,
    findById,
    insert,
    remove,
    update,
  });

  async function find({ ...query } = {}) {
    return (await db.find({ ...query })).map((found) => {
      return User({ ...found });
    });
  }

  async function findById({ id }) {
    const result = await db.findOne({ id });
    if (!result) return result;
    return User({ ...result });
  }

  async function findOne({ ...query }) {
    const result = await db.findOne({ ...query });
    if (!result) return result;
    return User({ ...result });
  }

  async function insert({ ...data }) {
    try {
      const user = User({ ...data });
      user.validate();
      const response = await db.insert({ ...user });
      return User({ ...response });
    } catch (e) {
      throw Error("error_creating_user");
    }
  }

  async function update({ id, ...data }) {
    try {
      const user = User({ ...data });
      user.validate();
      return await db.update({
        query: { id },
        data: { ...user.returnUpdatableValues() },
      });
    } catch (e) {
      throw Error("error_creating_user");
    }
  }

  async function remove({ id }) {
    try {
      return await db.remove({ id });
    } catch (e) {
      throw Error("error_creating_user");
    }
  }
}
