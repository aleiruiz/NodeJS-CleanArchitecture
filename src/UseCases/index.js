import makeAddUser from "./Users/add";
import makeEditUser from "./Users/edit";
import makeRemoveUser from "./Users/remove";
import { UserDataAccess } from "../DataAccess";

const addUser = makeAddUser({ UserDataAccess });
const editUser = makeEditUser({ UserDataAccess });
const removeUser = makeRemoveUser({ UserDataAccess });

const UserService = Object.freeze({
  addUser,
  editUser,
  removeUser,
});

export default UserService;
export { addUser, editUser, removeUser };
