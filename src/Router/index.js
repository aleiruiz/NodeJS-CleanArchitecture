import users from "./users";
import authentication from "./authentication";
import makeCallback from "../ExternalInterface/index";
import notFound from "../Controllers/notFound";
import test from "../Controllers/testApi";
import testAuth from "../Controllers/testAuth";
import { auth } from "../Middleware";
import "../Entities";

export default (prefix, app) => {
  users(prefix, app, makeCallback);
  authentication(prefix, app, makeCallback);
  app.get(`/`, makeCallback(test));
  app.get(`${prefix}/testAuth`, makeCallback(testAuth, [auth]));
  app.use(makeCallback(notFound));
};
