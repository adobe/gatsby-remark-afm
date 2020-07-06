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
        if (children[1]) {
          for (let i = 0; i < children[1].children.length; i++) {
            if (children[1].children[i].type === "link") {
              html = `${html}<a href="${children[1].children[i].url}">${children[1].children[i].children[0].value}</a>`;
            } else {
              html = `${html}${children[1].children[i].value}`;
            }
          }
          html = `${html}</Alert>`;
        } else if (children[0].children[1]) {
          for (let i = 1; i < children[0].children.length; i++) {
            if (children[0].children[i].type === "link") {
              html = `${html}<a href="${children[0].children[i].url}">${children[0].children[i].children[0].value}</a>`;
            } else {
              html = `${html}${children[0].children[i].value}`;
            }
          }
          html = `${html}</Alert>`;
        }

        node.type = "html";
        node.children = undefined;
        node.value = html;
      }
    }
  });
}

module.exports = admonitions;
