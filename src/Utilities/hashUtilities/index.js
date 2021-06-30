import crypto, { generateKeyPair } from "crypto";

const md5 = (text) => {
  return crypto.createHash("md5").update(text, "utf-8").digest("hex");
};

const generateSalt = () => {
  return crypto.randomBytes(16).toString("hex");
};

const createsPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
};

const validatesPassword = (password, salt) => {
  var hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

export default { md5, generateSalt, createsPassword, validatesPassword };
