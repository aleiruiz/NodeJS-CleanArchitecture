import makeLogin from "./login";
import { UserDataAccess } from "../../DataAccess";
import { jwtUtilities } from "../../Utilities";

const login = makeLogin({ UserDataAccess, jwtUtilities });

export { login };
