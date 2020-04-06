const visit = require("unist-util-visit");

function includeRelative(markdownAST) {
  visit(markdownAST, "paragraph", (node) => {
    if (node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        let text = node.children[i].value;
        let matches = text.match(/{%\s*include_relative\s*(.*?)\s*%}/g);
        if (matches && matches.length > 0) {
          for (let j = 0; j < matches.length; j++) {
            let filename = matches[j]
              .replace("{%", "")
              .replace("%}", "")
              .replace("include_relative", "")
              .trim();
            text = text.replace(
              matches[j],
              `<IncludeMarkdown file="${filename}"/ >`
            );
          }
          node.children[i].type = `html`;
          node.children[i].value = `<div>${text}</div>`;
          // find everything between the {% %} /{%\s*include_relative\s*(.*?)\s*%}/g
          // extract file name
          // add tag to load in html from other file
          // wrap everything in a div in case of other text
        }
      }
    }
  });
  // console.log(JSON.stringify(markdownAST));
}

module.exports = includeRelative;
