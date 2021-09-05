/**
 * @typedef User
 * @property {string} id
 * @property {string} profilePic
 * @property {string} userName
 * @property {string} email.required
 * @property {string} firstName
 * @property {string} lastName
 * @property {integer} createdOn
 * @property {integer} modifiedOn
 */
export default function BuildUser({
  idUtilities,
  hashUtilities,
  validateEmailFormat,
}) {
  return function User({
    id = idUtilities.makeId(),
    email,
    userName,
    firstName,
    lastName,
    profilePic,
    password,
    salt,
    createdOn = Date.now(),
    modifiedOn = Date.now(),
    deletedOn = null,
  } = {}) {
    const user = {
      id,
      email,
      userName,
      firstName,
      lastName,
      profilePic,
      password,
      salt,
      createdOn,
      modifiedOn,
      deletedOn,
    };

    const validate = () => {
      if (!idUtilities.isValidId(id)) {
        throw new Error("user_id_invalid");
      }
      if (!email || !validateEmailFormat(email)) {
        throw new Error("user_email_invalid");
      }
      if (!userName) {
        throw new Error("user_username_invalid");
      }
      if (!firstName || !lastName) {
        throw new Error("user_name_invalid");
      }
    };

    const validatePassword = (enteredPassword) => {
      return hashUtilities.validatesPassword(enteredPassword, salt, password);
    };

    const returnAllValues = () => {
      return {
        id,
        email,
        userName,
        firstName,
        lastName,
        profilePic,
        password,
        salt,
        createdOn,
        modifiedOn,
        deletedOn,
      };
    };

    const returnUpdatableValues = () => {
      return {
        profilePic,
        userName,
        email,
        firstName,
        lastName,
      };
    };

    const returnReadableValues = () => {
      return {
        id,
        profilePic,
        userName,
        email,
        firstName,
        lastName,
        createdOn,
        modifiedOn,
      };
    };

    const generateJWTToken = () => {
      return JWTUtilities.generateToken();
    };

    const returnFullName = () => {
      return firstName + lastName;
    };

    return Object.freeze({
      ...user,
      validate,
      validatePassword,
      returnFullName,
      returnAllValues,
      returnUpdatableValues,
      getId: () => id,
      isDeleted: () => deletedOn !== null,
      getCreatedOn: () => createdOn,
      returnHashedPassword: () => password,
      returnReadableValues,
      generateJWTToken,
      isSoftDeletable: false,
    });
  };
}
