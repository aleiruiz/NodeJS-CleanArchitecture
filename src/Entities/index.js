import { validateEmailFormat, hashUtilities, idUtilities } from "../Utilities";

import BuildUser from "./User";

const User = BuildUser({
  idUtilities,
  hashUtilities,
  validateEmailFormat,
});

export { User };
