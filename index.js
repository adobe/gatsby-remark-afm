const doNotLocalize = require("./src/DoNotLocalize");
const admonitions = require("./src/Admonitions");
const includeRelative = require("./src/IncludeRelative");
const tabbedCodeBlocks = require("./src/TabbedCodeBlocks");
const spectrumTable = require("./src/SpectrumTable");
const spectrumHeading = require("./src/SpectrumHeading");

module.exports = ({ markdownAST }, pluginOptions) => {
  includeRelative(markdownAST);
  doNotLocalize(markdownAST);
  admonitions(markdownAST);
  tabbedCodeBlocks(markdownAST);
  spectrumTable(markdownAST);
  spectrumHeading(markdownAST);
  return markdownAST;
};
