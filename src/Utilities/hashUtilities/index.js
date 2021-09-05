import crypto from "crypto";

const md5 = (text) => {
  return crypto.createHash("md5").update(text, "utf-8").digest("hex");
};

const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

const createsPassword = (password) => {
  let salt = generateSalt();
  let hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return { salt, hash };
};

const verifyValidPassword = (hashedPassword) => {
  const hexRegularExpresion = /[0-9A-Fa-f]{6}/g;

  return (
    hexRegularExpresion.test(hashedPassword) && hashedPassword.length >= 128
  );
};

const validatesPassword = (enteredPassword, salt, password) => {
  let hash = crypto
    .pbkdf2Sync(enteredPassword, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return hash === password;
};

export default {
  md5,
  generateSalt,
  createsPassword,
  validatesPassword,
  verifyValidPassword,
};
