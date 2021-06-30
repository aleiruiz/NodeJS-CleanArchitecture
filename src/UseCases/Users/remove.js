export default function makeRemoveUser({ usersDb }) {
  return async function removeUser({ id } = {}) {
    if (!id) {
      throw new Error("You must supply a user id.");
    }

    const userToBeDeleted = await usersDb.findById(id);

    if (!userToBeDeleted) {
      return deleteNothing();
    }

    return hardDelete(userToBeDeleted);
  };

  function deleteNothing() {
    return {
      deletedCount: 0,
      softDelete: false,
      message: "User not found, nothing to delete.",
    };
  }

  async function hardDelete(User) {
    await usersDb.remove(User);
    return {
      deletedCount: 1,
      softDelete: false,
      message: "User deleted.",
    };
  }
}
