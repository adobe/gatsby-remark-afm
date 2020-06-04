const visit = require("unist-util-visit");

function calculateVariant(depth) {
  switch (depth) {
    case 1:
      return "";
    case 2:
      return ` variant="pageTitle"`;
    case 3:
      return ` variant="subtitle1"`;
    case 4:
      return ` variant="subtitle2"`;
    case 5:
    case 6:
      return ` variant="subtitle3"`;
    default:
      return "";
  }
}

function createHeading(node) {
  let text = node.children
    .reduce(
      (accumulator, currentValue) =>
        accumulator + " " + (currentValue.value ? currentValue.value : ""),
      ""
    )
    .trim();
  const variant = node.depth > 1 ? calculateVariant(node.depth) : "";
  return `<Heading${variant}>${text}</Heading>`;
}

function spectrumHeading(markdownAST) {
  visit(markdownAST, "heading", (node) => {
    const html = createHeading(node);

    node.type = "html";
    node.children = undefined;
    node.value = html;
  });
}

module.exports = spectrumHeading;
