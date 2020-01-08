const fs = require("fs");
const remark = require("remark");

const readMarkdownFile = (fileName, isCustomTransformer) =>
  fs.readFileSync(`./tests/fixtures/${fileName}.md`, "utf8");

const getMarkdownASTForFile = (fileName, isCustomTransformer = false) =>
  remark.parse(readMarkdownFile(fileName, isCustomTransformer));

module.exports = {
  getMarkdownASTForFile: getMarkdownASTForFile,
  parseASTToMarkdown: remark.stringify
};
