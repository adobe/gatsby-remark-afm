const doNotLocalize = require("../src/DoNotLocalize");
const admonitions = require("../src/Admonitions");
const includeRelative = require("../src/IncludeRelative");
const {
  getMarkdownASTForFile,
  parseASTToMarkdown,
} = require("./helpers/markdown");
const plugin = require("../index");
const fs = require("fs");

describe("includeRelative", () => {
  it("is truthy", () => {
    expect(includeRelative).toBeTruthy();
  });
  it("can detect includeRelative", async () => {
    const markdownAST = getMarkdownASTForFile("include-relative", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "before

      more text

      <div><IncludeMarkdown file=\\"include-me.md\\"/ >
      after</div>
      "
    `);
  });
  it("can detect includeRelative (only includes)", async () => {
    const markdownAST = getMarkdownASTForFile("aepcs-api-reference", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "<div><IncludeMarkdown file=\\"static/acppath_delete_asset_top.md\\"/ ></div>

      <div><IncludeMarkdown file=\\"auto-generated/acppath_delete_asset_params.md\\"/ ></div>

      <div><IncludeMarkdown file=\\"static/acppath_delete_asset_bottom.md\\"/ ></div>
      "
    `);
  });
  it("can detect includeRelative after gatsby-transform-remark", async () => {
    const markdownAST = require("../tests/fixtures/acpcs-api-reference");
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "<div><IncludeMarkdown file=\\"static/acppath_delete_using_repometadata_top.md\\"/ ></div>

      <div><IncludeMarkdown file=\\"auto-generated/acppath_delete_using_repometadata_params.md\\"/ ></div>

      <div><IncludeMarkdown file=\\"static/acppath_delete_using_repometadata_bottom.md\\"/ ></div>
      "
    `);
  });
});

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

describe("admonitions", () => {
  it("is truthy", () => {
    expect(admonitions).toBeTruthy();
  });
  it("can transform !Note tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-note", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Note\\" variant=\\"info\\">This is a standard NOTE block.</Alert>
      "
    `);
  });
  it("can transform !Caution tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-caution", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Caution\\" variant=\\"error\\">This is a standard CAUTION block.</Alert>
      "
    `);
  });
  it("can transform !Warning tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-warning", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Warning\\" variant=\\"warning\\">This is a standard WARNING block.</Alert>
      "
    `);
  });
  it("can transform !Tip tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-tip", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Tip\\" variant=\\"help\\">This is a standard TIP block.</Alert>
      "
    `);
  });
  it("can transform multi-line tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-multiline", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Warning\\" variant=\\"warning\\">This is a standard WARNING block.
      It goes on for a few lines.
      Then we finish with some more text.</Alert>

      Like So
      "
    `);
  });
  it("can transform tags with embedded urls", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-url", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Warning\\" variant=\\"warning\\">Before <a href=\\"https://example.com\\">website</a> After</Alert>
      "
    `);
  });
});
