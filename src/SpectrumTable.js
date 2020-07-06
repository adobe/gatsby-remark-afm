/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
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
