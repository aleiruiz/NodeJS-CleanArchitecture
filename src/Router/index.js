import users from "./users";
import makeCallback from "../ExternalInterface/index";
import notFound from "../Controllers/notFound";

export default (prefix, app) => {
  users(prefix, app, makeCallback);
  app.use(makeCallback(notFound));
};
