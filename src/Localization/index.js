const { I18n } = require("i18n");
const path = require("path");

export default new I18n({
  locales: ["es", "en"],
  directory: path.resolve("./Locales"),
  header: "accept-language",
});
