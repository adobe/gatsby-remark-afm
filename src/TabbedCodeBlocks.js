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
