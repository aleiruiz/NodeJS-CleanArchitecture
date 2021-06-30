import cuid from "cuid";

const IdUtilities = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid,
});

export default IdUtilities;
