const visit = require("unist-util-visit");
const toString = require("mdast-util-to-string");

const createTable = (node) => {
  return `
      <spectrumtable>
            ${node.children
              .map((row, index) => {
                if (index === 0) {
                  return `<spectrumthead>
                  ${row.children
                    .map((head) => `<spectrumth>${toString(head)}</spectrumth>`)
                    .join("")}
                    </spectrumthead>`;
                } else {
                  const startBody = index === 1 ? `<spectrumtbody>` : "";
                  const endBody =
                    index === node.children.length - 1
                      ? `</spectrumtbody>`
                      : "";
                  return `${startBody}
                  <spectrumtr>
                  ${row.children
                    .map((body) => `<spectrumtd>${toString(body)}</spectrumtd>`)
                    .join("")}
                  </spectrumtr>
                  ${endBody}`;
                }
              })
              .join("")}
      </spectrumtable>
    `;
};

function spectrumTable(markdownAST) {
  visit(markdownAST, `table`, (node) => {
    if (!node.type.indexOf(`table`) === -1) {
      return;
    }

    const html = createTable(node);

    node.type = "html";
    node.children = undefined;
    node.value = html;
  });

  return markdownAST;
}

module.exports = spectrumTable;
