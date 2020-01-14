const visit = require("unist-util-visit");
const toString = require("mdast-util-to-string");

function admonitions(markdownAST) {
  visit(markdownAST, "blockquote", node => {
    console.log(node);
    let children = node.children;
    let html = null;
    if (
      children.length > 0 &&
      children[0].type === "paragraph" &&
      children[0].children.length > 0 &&
      children[0].children[0].type === "linkReference"
    ) {
      switch (children[0].children[0].label) {
        case "!NOTE":
          console.log("found a note");
          html = `<Alert header="Note" variant="info">${children[1].children[0].value}</Alert>`;
          break;
        case "!TIP":
          console.log("found a tip");
          html = `<Alert header="Tip" variant="help">${children[1].children[0].value}</Alert>`;
          break;
        case "!CAUTION":
          console.log("found a caution");
          html = `<Alert header="Caution" variant="error">${children[1].children[0].value}</Alert>`;
          break;
        case "!WARNING":
          console.log("found a tip");
          html = `<Alert header="Warning" variant="warning">${children[1].children[0].value}</Alert>`;
          break;
      }

      if (html) {
        node.type = "html";
        node.children = undefined;
        node.value = html;
      }
    }
  });
}

module.exports = admonitions;
