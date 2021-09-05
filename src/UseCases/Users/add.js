export default function makeAddUser({
  UserDataAccess,
  hashUtilities,
  fileUtilities,
}) {
  return async function addUser({ files, ...userInfo } = {}) {
    if (!userInfo.password || userInfo.password.length < 6) {
      throw new Error("user_invalid_password");
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      throw new Error("password_confirmation_needed");
    }
    const usersDb = await UserDataAccess();
    const exists = await usersDb.find({
      email: userInfo.email,
    });
    if (exists.length != 0) {
      throw new Error("user_already_exists");
    }
    const pwdHash = hashUtilities.createsPassword(userInfo.password);

    const user = {
      ...userInfo,
      password: pwdHash.hash,
      salt: pwdHash.salt,
    };

    if (files) {
      user.profilePic = await fileUtilities.uploadBlob(
        files.profilePic,
        "prf",
        "image"
      );
    }

    return usersDb.insert({ ...user });
  };
}
