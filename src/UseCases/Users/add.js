export default function makeAddUser({ usersDb }) {
  return async function addUser(userInfo) {
    if (userInfo.password !== userInfo.confirmPassword) {
      throw new Error("Password must be confirmed.");
    }
    const exists = await usersDb.findAll({ query: { email: userInfo.email } });
    if (exists.length != 0) {
      throw new Error("User already exists.");
    }

    return usersDb.insert({ userInfo });
  };
}
