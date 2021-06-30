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
    password,
    salt = hashUtilities.generateSalt(),
    createdOn = Date.now(),
    modifiedOn = Date.now(),
    deletedOn = null,
  } = {}) {
    if (!idUtilities.isValidId(id)) {
      throw new Error("User must have a valid id.");
    }
    if (!email || !validateEmailFormat(email)) {
      throw new Error("User must have a valid email.");
    }
    if (!userName) {
      throw new Error("User must have a valid name.");
    }
    if (!firstName || !lastName) {
      throw new Error("User must have a valid first and last name.");
    }
    if (!password || password.length < 6) {
      throw new Error(
        "User must have a valid password, please make sure to make the password at least 6 characters."
      );
    }

    password = hashUtilities.createsPassword(password, salt);

    const validatePassword = (enteredPassword) => {
      hashUtilities.validatesPassword(enteredPassword, salt);
    };

    const returnAllValues = () => {
      return {
        id,
        email,
        userName,
        firstName,
        lastName,
        password,
        salt,
        createdOn,
        modifiedOn,
        deletedOn,
      };
    };

    const returnUpdatableValues = () => {
      return {
        email,
        userName,
        firstName,
        lastName,
      };
    };

    const returnFullName = () => {
      return firstName + lastName;
    };

    return Object.freeze({
      validatePassword,
      returnFullName,
      returnAllValues,
      getId: () => id,
      isDeleted: () => deletedOn !== null,
      getCreatedOn: () => createdOn,
      returnHashedPassword: () => password,
      returnUpdatableValues,
      isSoftDeletable: false,
    });
  };
}
