import {
  deleteUser,
  getUsers,
  postUser,
  patchUser,
} from "../Controllers/Users";
const router = require("express").Router();

export default (prefix, app, makeCallback) => {
  router.post(`${prefix}/users`, makeCallback(postUser));

  router.delete(`${prefix}/users/:id`, makeCallback(deleteUser));

  router.delete(`${prefix}/users`, makeCallback(deleteUser));

  router.patch(`${prefix}/users/:id`, makeCallback(patchUser));

  router.patch(`${prefix}/users`, makeCallback(patchUser));

  router.get(`${prefix}/users`, makeCallback(getUsers));

  app.use(`/${prefix}/users`, router);
};
