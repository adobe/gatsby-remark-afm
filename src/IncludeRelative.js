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

function includeRelative(markdownAST) {
  visit(markdownAST, "paragraph", (node) => {
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
