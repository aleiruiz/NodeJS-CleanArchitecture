import makeAddUser from "./add";
import makeEditUser from "./edit";
import makeRemoveUser from "./remove";
import makeGetUser from "./get";
import { UserDataAccess } from "../../DataAccess";
import { hashUtilities, fileUtilities } from "../../Utilities";

const addUser = makeAddUser({ UserDataAccess, hashUtilities, fileUtilities });
const editUser = makeEditUser({ UserDataAccess, fileUtilities });
const removeUser = makeRemoveUser({ UserDataAccess });
const getUser = makeGetUser({ UserDataAccess });

export { addUser, editUser, removeUser, getUser };
