import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

const generateToken = (user) => {
  return jwt.sign(user, secret);
};

const validateToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw Error("unauthorized");
  }
};

export default { generateToken, validateToken };
