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
const remove = require("unist-util-remove");
const toString = require("mdast-util-to-string");

function tabbedCodeBlocks(markdownAST) {
  // console.log(JSON.stringify(markdownAST));
  let head = null;
  visit(markdownAST, "code", (node) => {
    // console.log(JSON.stringify(node));
    if (node.meta && node.meta.includes(`tab-group`)) {
      if (!head) {
        // console.log("no head");
        head = node;
        head.type = "html";
        head.children = undefined;
        head.value = `<TabView
        orientation="horizontal"
      >
      <Tab
          disabled={false}
          icon={undefined}
          invalid={false}
          renderChildren
          selected={false}
          tabIndex={0}
          label="${node.lang}"
        >
          ${node.value}
        </Tab>
        </TabView>`;
        delete head.meta;
      } else {
        // console.log("head");

        let newTab = `<Tab
          disabled={false}
          icon={undefined}
          invalid={false}
          renderChildren
          selected={false}
          tabIndex={0}
          label="${node.lang}"
        >
          ${node.value}
        </Tab>
        </TabView>`;
        head.value = head.value.replace("</TabView>", newTab);
        node.value = "remove";
      }
    } else {
      head = null;
    }
  });
  // console.log(JSON.stringify(markdownAST));
}

module.exports = tabbedCodeBlocks;
