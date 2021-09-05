export default function makeEditUser({ UserDataAccess, fileUtilities }) {
  return async function editUser({ id, files, ...changes } = {}) {
    if (!id) {
      throw new Error("You must supply an id.");
    }
    let usersDb = await UserDataAccess();

    const existing = await usersDb.findById({ id });

    if (!existing) {
      throw new RangeError("user not found.");
    }

    const user = {
      ...changes,
    };

    if (files) {
      user.profilePic = await fileUtilities.uploadBlob(
        files.profilePic,
        "prf",
        "image"
      );
    }

    return await usersDb.update({ ...user, id });
  };
}
