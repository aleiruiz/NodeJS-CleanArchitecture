import { default as Entities } from "../../Entities";

const { User } = Entities;

export default async function UserDataAccess({ connectToDB }) {
  const db = await connectToDB();

  return Object.freeze({
    findAll,
    findById,
    insert,
    remove,
    update,
    updatePassword,
  });

  async function findAll({ query } = {}) {
    const result = await db.collection("user").find(query);
    return (await result.toArray()).map(({ _id: id, ...found }) => ({
      id,
      ...found,
    }));
  }

  async function findById(id) {
    const result = await db.collection("user").findOne({ id });
    if (!result) {
      return null;
    }
    const { _id, ...info } = result;
    return { _id, ...info };
  }

  async function insert({ userInfo }) {
    const user = User({ ...userInfo }).returnAllValues();
    const result = await db.collection("user").insertOne(user);
    const { _id: id, ...insertedInfo } = result.ops[0];
    return { id, ...insertedInfo };
  }

  async function updatePassword({ id, ...userInfo }) {
    const user = User({ ...userInfo });
    const result = await db
      .collection("user")
      .updateOne({ _id }, { $set: { password: user.returnHashedPassword() } });
    return result.modifiedCount > 0 ? { id, ...userInfo } : null;
  }

  async function update({ id, ...userInfo }) {
    const user = User({ ...userInfo });
    const updatableValues = user.returnUpdatableValues();
    const result = await db
      .collection("user")
      .updateOne({ id }, { $set: { ...updatableValues } });
    return result.modifiedCount > 0 ? { id, ...userInfo } : null;
  }

  async function remove({ id }) {
    const result = await db.collection("user").deleteOne({ id });
    return result.deletedCount;
  }
}
