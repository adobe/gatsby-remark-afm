const doNotLocalize = require("../src/DoNotLocalize");
const {
  getMarkdownASTForFile,
  parseASTToMarkdown
} = require("./helpers/markdown");
const plugin = require("../index");

describe("doNotLocalize", () => {
  it("is truthy", () => {
    expect(doNotLocalize).toBeTruthy();
  });
  it("can transform !DNL tags", async () => {
    const markdownAST = getMarkdownASTForFile("do-not-localize", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      Adobe
      "
    `);
  });
});
