import {
  deleteUser,
  getUsers,
  postUser,
  patchUser,
} from "../Controllers/Users";

export default (prefix, app, makeCallback) => {
  app.post(`${prefix}/users`, makeCallback(postUser));

  app.delete(`${prefix}/users/:id`, makeCallback(deleteUser));

  app.delete(`${prefix}/users`, makeCallback(deleteUser));

  app.patch(`${prefix}/users/:id`, makeCallback(patchUser));

  app.patch(`${prefix}/users`, makeCallback(patchUser));

  app.get(`${prefix}/users`, makeCallback(getUsers));
};
