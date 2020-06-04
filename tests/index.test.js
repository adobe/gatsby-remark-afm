const doNotLocalize = require("../src/DoNotLocalize");
const admonitions = require("../src/Admonitions");
const includeRelative = require("../src/IncludeRelative");
const tabbedCodeBlocks = require("../src/TabbedCodeBlocks");
const spectrumHeading = require("../src/SpectrumHeading");
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
      "<Heading>Don't Delete:</Heading>

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
      "<Heading>Don't Delete:</Heading>

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Note\\" variant=\\"info\\">This is a standard NOTE block.</Alert>
      "
    `);
  });
  it("can transform !Caution tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-caution", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "<Heading>Don't Delete:</Heading>

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Caution\\" variant=\\"error\\">This is a standard CAUTION block.</Alert>
      "
    `);
  });
  it("can transform !Warning tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-warning", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "<Heading>Don't Delete:</Heading>

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Warning\\" variant=\\"warning\\">This is a standard WARNING block.</Alert>
      "
    `);
  });
  it("can transform !Tip tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-tip", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "<Heading>Don't Delete:</Heading>

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Tip\\" variant=\\"help\\">This is a standard TIP block.</Alert>
      "
    `);
  });
  it("can transform multi-line tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-multiline", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "<Heading>Don't Delete:</Heading>

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Warning\\" variant=\\"warning\\">This is a standard WARNING block.
      It goes on for a few lines.
      Then we finish with some more text.</Alert>

      Like So
      "
    `);
  });
  it("can transform inline tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-inline", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "<Heading>Don't Delete:</Heading>

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Note\\" variant=\\"info\\"> Only a user with sufficient rights can create a property. See <a href=\\"user-permissions.md\\">User Management</a>.</Alert>

      Like So
      "
    `);
  });
  it("can transform tags with embedded urls", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-url", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "<Heading>Don't Delete:</Heading>

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Warning\\" variant=\\"warning\\">Before <a href=\\"https://example.com\\">website</a> After</Alert>
      "
    `);
  });
});

describe("tabbedCodeBlocks", () => {
  it("is truthy", () => {
    expect(tabbedCodeBlocks).toBeTruthy();
  });
  it("can convert multiple code blocks into tabs", async () => {
    const markdownAST = getMarkdownASTForFile("tabbed-code-blocks", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "<Heading>Tabbed code blocks</Heading>

      Some Code

      <TabView
              orientation=\\"horizontal\\"
            >
            <Tab
                disabled={false}
                icon={undefined}
                invalid={false}
                renderChildren
                selected={false}
                tabIndex={0}
                label=\\"json\\"
              >
                {
        \\"op\\": \\"copy\\",
        \\"target\\": {
          \\"path\\": \\"/content/assets/7d391c3c-a3d4-4f66-81ce-40066732db60/target\\"
        },
        \\"source\\": {
          \\"path\\": \\"/content/assets/7d391c3c-a3d4-4f66-81ce-40066732db60/source/test.psd\\"
        }
      }
              </Tab>
              <Tab
                disabled={false}
                icon={undefined}
                invalid={false}
                renderChildren
                selected={false}
                tabIndex={0}
                label=\\"json\\"
              >
                {
        \\"op\\": \\"copy\\",
        \\"target\\": {
          \\"path\\": \\"/content/assets/7d391c3c-a3d4-4f66-81ce-40066732db60/target/test.psd\\"
        },
        \\"source\\": {
          \\"path\\": \\"/content/assets/7d391c3c-a3d4-4f66-81ce-40066732db60/source/test.psd\\"
        }
      }
              </Tab>
              </TabView>

      \`\`\`json tab-group='hello-world-snippets' tab-name='ruby'
      remove
      \`\`\`

      \`\`\`json
      {
        \\"op\\": \\"copy\\",
        \\"target\\": {
          \\"path\\": \\"/content/assets/7d391c3c-a3d4-4f66-81ce-40066732db60/target/test.psd\\"
        },
        \\"source\\": {
          \\"path\\": \\"/content/assets/7d391c3c-a3d4-4f66-81ce-40066732db60/source/test.psd\\"
        }
      }
      \`\`\`
      "
    `);
  });
});

describe("spectrumHeading", () => {
  it("is truthy", () => {
    expect(spectrumHeading).toBeTruthy();
  });
  it("can convert multiple code blocks into tabs", async () => {
    const markdownAST = getMarkdownASTForFile("headers", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "<Heading>Heading One</Heading>

      then some text

      <Heading variant=\\"pageTitle\\">Heading Two</Heading>

      more text

      <Heading variant=\\"subtitle1\\">Heading Three</Heading>

      This is getting silly

      <Heading variant=\\"subtitle2\\">Heading Four</Heading>

      I mean are we done yet?

      <Heading variant=\\"subtitle3\\">Heading Five</Heading>

      Yes, we are.
      "
    `);
  });
});
