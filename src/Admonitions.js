const visit = require("unist-util-visit");
const toString = require("mdast-util-to-string");

function admonitions(markdownAST) {
  visit(markdownAST, "blockquote", (node) => {
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
          html = `<Alert header="Note" variant="info">`;
          break;
        case "!TIP":
          html = `<Alert header="Tip" variant="help">`;
          break;
        case "!CAUTION":
          html = `<Alert header="Caution" variant="error">`;
          break;
        case "!WARNING":
          html = `<Alert header="Warning" variant="warning">`;
          break;
      }

      if (html) {
        for (let i = 0; i < children[1].children.length; i++) {
          if (children[1].children[i].type === "link") {
            html = `${html}<a href="${children[1].children[i].url}">${children[1].children[i].children[0].value}</a>`;
          } else {
            html = `${html}${children[1].children[i].value}`;
          }
        }
        html = `${html}</Alert>`;

        node.type = "html";
        node.children = undefined;
        node.value = html;
      }
    }
  });
}

module.exports = admonitions;
