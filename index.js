const doNotLocalize = require("./src/DoNotLocalize");
const admonitions = require("./src/Admonitions");
const includeRelative = require("./src/IncludeRelative");

module.exports = ({ markdownAST }, pluginOptions) => {
  includeRelative(markdownAST);
  doNotLocalize(markdownAST);
  admonitions(markdownAST);
  return markdownAST;
};
