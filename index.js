const doNotLocalize = require("./src/DoNotLocalize");

module.exports = ({ markdownAST }, pluginOptions) => {
  doNotLocalize(markdownAST);
  return markdownAST;
};
