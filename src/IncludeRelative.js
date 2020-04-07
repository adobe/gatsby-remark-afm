const visit = require("unist-util-visit");

function includeRelative(markdownAST) {
  visit(markdownAST, "paragraph", (node) => {
    if (node.children.length > 0) {
      for (let child of node.children) {
        let text = child.value;
        if (text) {
          const matches = text.match(/{%\s*include_relative\s*(.*?)\s*%}/g);
          if (matches && matches.length > 0) {
            for (const match of matches) {
              let filename = match
                .replace("{%", "")
                .replace("%}", "")
                .replace("include_relative", "")
                .trim();
              text = text.replace(
                match,
                `<IncludeMarkdown file="${filename}"/ >`
              );
            }
            child.type = `html`;
            child.value = `<div>${text}</div>`;
          }
        }
      }
    }
  });
}

module.exports = includeRelative;
