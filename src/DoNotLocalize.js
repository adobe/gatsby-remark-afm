const visit = require("unist-util-visit");
const toString = require("mdast-util-to-string");

function doNotLocalize(markdownAST) {
  visit(markdownAST, "linkReference", node => {
    if (node.label.includes("!DNL")) {
      let text = toString(node);
      node.type = `text`;
      node.value = text.replace("!DNL", "").trim();
      node.children = undefined;
    }
  });
}

module.exports = doNotLocalize;
