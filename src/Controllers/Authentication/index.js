import { login } from "../../UseCases";
import makeLogin from "./post";

const loginUser = makeLogin({ login });

const AuthenticationController = Object.freeze({
  loginUser,
});

export default AuthenticationController;
export { loginUser };
