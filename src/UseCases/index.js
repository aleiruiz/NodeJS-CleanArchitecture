import { addUser, editUser, removeUser, getUser } from "./Users";
import { login } from "./Authentication";

const UserService = Object.freeze({
  addUser,
  editUser,
  removeUser,
  login,
});

export default UserService;
export { addUser, editUser, removeUser, getUser, login };
