const doNotLocalize = require("./src/DoNotLocalize");
const admonitions = require("./src/Admonitions");

module.exports = ({ markdownAST }, pluginOptions) => {
  doNotLocalize(markdownAST);
  admonitions(markdownAST);
  return markdownAST;
};
