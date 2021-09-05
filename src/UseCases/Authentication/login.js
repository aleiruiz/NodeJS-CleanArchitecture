export default function makeLogin({ UserDataAccess, jwtUtilities }) {
  return async function authentication(credentials) {
    if (!credentials.email) {
      throw new Error("email_missing");
    }
    if (!credentials.password) {
      throw new Error("password_missing");
    }
    let usersDb = await UserDataAccess();
    const user = await usersDb.findOne({ email: credentials.email });
    if (!user) {
      throw new Error("user_not_found");
    }

    if (!user.validatePassword(credentials.password)) {
      throw new Error("incorrect_password");
    }

    const userData = user.returnReadableValues();

    return {
      user: userData,
      token: jwtUtilities.generateToken(userData),
    };
  };
}
