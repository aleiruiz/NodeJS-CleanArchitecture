import { addUser, editUser, getUser, removeUser } from "../../UseCases";
import makeDeleteUser from "./delete";
import makeGetUsers from "./get";
import makePostUser from "./post";
import makePatchUser from "./patch";

const deleteUser = makeDeleteUser({ removeUser });
const getUsers = makeGetUsers({
  getUser,
});
const postUser = makePostUser({ addUser });
const patchUser = makePatchUser({ editUser });

const UserController = Object.freeze({
  deleteUser,
  getUsers,
  postUser,
  patchUser,
});

export default UserController;
export { deleteUser, getUsers, postUser, patchUser };
