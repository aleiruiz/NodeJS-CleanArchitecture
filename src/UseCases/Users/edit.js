export default function makeEditUser({ usersDb }) {
  return async function editUser({ id, ...changes } = {}) {
    if (!id) {
      throw new Error("You must supply an id.");
    }
    const existing = await usersDb.findById(id);

    if (!existing) {
      throw new RangeError("user not found.");
    }

    const updated = await usersDb.update({
      ...existing,
      ...changes,
      modifiedOn: null,
    });
    return { ...existing, ...updated };
  };
}
