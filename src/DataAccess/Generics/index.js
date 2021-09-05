export default async function Generics({ connectToDB }) {
  const db = await connectToDB();

  return function DataAccess({ tableName }) {
    return Object.freeze({
      find,
      findOne,
      insert,
      remove,
      update,
    });

    async function find({ ...query } = {}) {
      const result = await db.collection(tableName).find({ ...query });
      return await result.toArray();
    }

    async function findOne({ ...query }) {
      const result = await db.collection(tableName).findOne({ ...query });
      if (!result) return null;
      return result;
    }

    async function insert({ ...data }) {
      return (await db.collection(tableName).insertOne({ ...data })).ops[0];
    }

    async function update({ query, data }) {
      const result = await db
        .collection(tableName)
        .updateOne({ ...query }, { $set: { ...data } });
      return result.modifiedCount;
    }

    async function remove({ ...query }) {
      const result = await db.collection(tableName).deleteOne({ ...query });
      return result.deletedCount;
    }
  };
}
