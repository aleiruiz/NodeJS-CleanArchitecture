export default function makeRemoveUser({ UserDataAccess }) {
  return async function removeUser({ id } = {}) {
    if (!id) {
      throw new Error("You must supply a user id.");
    }
    let usersDb = await UserDataAccess();

    const userToBeDeleted = await usersDb.findById({ id });

    if (!userToBeDeleted) {
      return deleteNothing();
    }

    return hardDelete(userToBeDeleted, usersDb);
  };

  function deleteNothing() {
    return {
      deletedCount: 0,
      softDelete: false,
      message: "User not found, nothing to delete.",
    };
  }

  async function hardDelete(User, usersDb) {
    await usersDb.remove({ id: User.id });
    return {
      deletedCount: 1,
      softDelete: false,
      message: "User deleted.",
    };
  }
}
