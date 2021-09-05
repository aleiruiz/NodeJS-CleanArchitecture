import makeAuth from "./auth";
import { jwtUtilities } from "../Utilities";

const auth = { name: "auth", exec: makeAuth({ jwtUtilities }) };

export { auth };
