import {
  validateEmailFormat,
  hashUtilities,
  idUtilities,
  sanitizeHTMLText,
} from "../Utilities";

import BuildUser from "./User";

const User = BuildUser({
  idUtilities,
  hashUtilities,
  sanitizeHTMLText,
  validateEmailFormat,
});

export default { User };
