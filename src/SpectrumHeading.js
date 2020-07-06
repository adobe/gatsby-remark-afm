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
