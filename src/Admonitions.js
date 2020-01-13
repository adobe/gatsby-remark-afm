const visit = require("unist-util-visit");
const toString = require("mdast-util-to-string");

function admonitions(markdownAST) {
  visit(markdownAST, "blockquote", node => {
    console.log(node);
    let children = node.children;
    if (
      children.length > 0 &&
      children[0].type === "paragraph" &&
      children[0].children.length > 0 &&
      children[0].children[0].type === "linkReference" &&
      children[0].children[0].label === "!NOTE"
    ) {
      console.log("found a note");
      const html = `<Alert header="Note" variant="info">${children[1].children[0].value}</Alert>`;
      node.type = "html";
      node.children = undefined;
      node.value = html;
    } else if (
      children.length > 0 &&
      children[0].type === "paragraph" &&
      children[0].children.length > 0 &&
      children[0].children[0].type === "linkReference" &&
      children[0].children[0].label === "!TIP"
    ) {
      console.log("found a tip");
      const html = `<Alert header="Tip" variant="help">${children[1].children[0].value}</Alert>`;
      node.type = "html";
      node.children = undefined;
      node.value = html;
    } else if (
      children.length > 0 &&
      children[0].type === "paragraph" &&
      children[0].children.length > 0 &&
      children[0].children[0].type === "linkReference" &&
      children[0].children[0].label === "!CAUTION"
    ) {
      console.log("found a caution");
      const html = `<Alert header="Caution" variant="error">${children[1].children[0].value}</Alert>`;
      node.type = "html";
      node.children = undefined;
      node.value = html;
    } else if (
      children.length > 0 &&
      children[0].type === "paragraph" &&
      children[0].children.length > 0 &&
      children[0].children[0].type === "linkReference" &&
      children[0].children[0].label === "!WARNING"
    ) {
      console.log("found a tip");
      const html = `<Alert header="Warning" variant="warning">${children[1].children[0].value}</Alert>`;
      node.type = "html";
      node.children = undefined;
      node.value = html;
    }
  });
}

module.exports = admonitions;
