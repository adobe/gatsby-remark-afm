const doNotLocalize = require("./src/DoNotLocalize");
const admonitions = require("./src/Admonitions");
const includeRelative = require("./src/IncludeRelative");
const tabbedCodeBlocks = require("./src/TabbedCodeBlocks");
const spectrumTable = require("./src/SpectrumTable");

module.exports = ({ markdownAST }, pluginOptions) => {
  includeRelative(markdownAST);
  doNotLocalize(markdownAST);
  admonitions(markdownAST);
  tabbedCodeBlocks(markdownAST);
  spectrumTable(markdownAST);
  return markdownAST;
};
