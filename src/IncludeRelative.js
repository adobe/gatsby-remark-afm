const visit = require("unist-util-visit");

function includeRelative(markdownAST) {
  visit(markdownAST, "paragraph", node => {
    if (node.children.length === 1) {
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
    } else if (node.children.length > 1 && node.children[0].value) {
      const matches = node.children[0].value.match(/{%\s*include/g);
      if (matches && matches.length > 0) {
        let text = "";
        for (let child of node.children) {
          if (child.type !== "emphasis") {
            text += child.value;
          } else {
            for (let emphasisChild of child.children) {
              text = `${text}_${emphasisChild.value}_`;
            }
          }
        }
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
          node.children = [{ type: `html`, value: `<div>${text}</div>` }];
        }
      }
    }
  });
}

module.exports = includeRelative;
