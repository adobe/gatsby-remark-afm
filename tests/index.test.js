const doNotLocalize = require("../src/DoNotLocalize");
const admonitions = require("../src/Admonitions");
const includeRelative = require("../src/IncludeRelative");
const tabbedCodeBlocks = require("../src/TabbedCodeBlocks");
const spectrumHeading = require("../src/SpectrumHeading");
const {
  getMarkdownASTForFile,
  parseASTToMarkdown
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
  it("can headers to spectrum headings", async () => {
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
  it("can convert multiple code blocks into tabs", async () => {
    const markdownAST = getMarkdownASTForFile("headers-too", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "<Heading>Analytics 2.0 APIs</Heading>

      Documentation for the analytics 2.0 APIs

      This documentation provides instructions for Adobe Analytics 2.0 APIs. For working with Analytics 1.4 APIs, see [Analytics 1.4 API Documentation](https://github.com/AdobeDocs/analytics-1.4-apis).

      The Adobe Analytics APIs are a collection of APIs that power Adobe Analytics products like Analysis Workspace. The APIs allow for the creation of data rich user interfaces that you can use to manipulate and integrate data. You can also create reports to explore, get insights, or answer important questions about your data.  

      _CONTRIBUTING: We encourage you to participate in our open documentation initiative, if you have suggestions, corrections, additions or deletions for this documentation, check out the source from [this github repo](https://github.com/AdobeDocs/analytics-2.0-apis), and submit a pull request with your contribution. For more information, refer to the [Contributing](https://github.com/AdobeDocs/analytics-2.0-apis/blob/master/CONTRIBUTING.md) page._

      It is assumed that you have an understanding of the Adobe Analytics product, its features and capabilities and that you know how to use the product. Thus an introduction to Adobe Analytics is outside of the scope of this documentation. For more information about the Adobe Analytics product, refer to the [Adobe Analytics documentation](https://marketing.adobe.com/resources/help/en_US/analytics/getting-started/).

      <Heading variant=\\"pageTitle\\">Getting Started</Heading>

      To get started with Analytics 2.0 APIs you must first decide whether your application will need an OAuth client or a JWT client.

      <Heading variant=\\"subtitle1\\">Authentication</Heading>

      There multiple types of authentication for authenticating with the analytics APIs. General information about authenticating with Adobe's APIs is located [here](https://www.adobe.io/authentication/auth-methods.html#!AdobeDocs/adobeio-auth/master/AuthenticationOverview/AuthenticationGuide.md). Specific information related to authenticating with the analytics APIs is available in the sections below.

      <Heading variant=\\"subtitle2\\">OAuth</Heading>

      Use an OAuth client if you are creating an application that requires an end user to authenticate before calling the Adobe Analytics APIs. The OAuth tokens expire after 24 hours and the end user must then re-authenticate before they will be able to call the APIs. To authenticate with an OAuth client, you first create an [OAuth client on the Adobe I/O Console](create-oauth-client.md). You can then use either method below with your client:

      -   Use [cURL for OAuth authentication](oauth-curl.md).

      -   Use [Postman for OAuth authentication](oauth-postman.md).

      **Note:** The \`refresh token\` grant type is automatically added to OAuth clients created after September 18, 2019

      <Heading variant=\\"subtitle2\\">JWT</Heading>

      A JWT client is best if you are creating an application that needs to programmatically authenticate calls to the Adobe Analytics APIs. A new JWT token can be generated whenever the old one is about to expire so your application can continue to make API calls. 

      For more information see [JWT authentication](jwt.md).

      <Heading variant=\\"pageTitle\\">Try Now</Heading>

      Try the Analytics 2.0 API in seconds. Use our [Swagger UI](https://adobedocs.github.io/analytics-2.0-apis/) to explore APIs, make calls and get a response. Our Swagger UI also includes the full endpoint descriptions. 

      <Heading variant=\\"pageTitle\\">Discovery API</Heading>

      The [Discovery API](discovery.md) returns information on the user's company that is necessary for making other Adobe Analytics API calls.

      <Heading variant=\\"pageTitle\\">Reporting API Guide</Heading>

      The [Reporting API Guide](reporting-guide.md) provides configuration guidance and best practices for the \`/reports\` endpoint.
      Please also refer to the [Reporting Tricks Guide](reporting-tricks.md) to learn how to use analysis workspace to build and validate your API requests.

      <Heading variant=\\"pageTitle\\">Segments API Guide</Heading>

      The [Segments API Guide](segments-guide.md) provides configuration guidance and best practices for the \`/segments\` endpoint. 

      <Heading variant=\\"pageTitle\\">Migrating from 1.4 APIs to 2.0 APIs</Heading>

      For help migrating from the 1.3/1.4 versions of the Analytics API to the newer and more capable \`/reports\` API, refer to the [migration guide](migration-guide.md)

      <Heading variant=\\"pageTitle\\">API Request Timeouts</Heading>

      The timeout for API requests through adobe.io is currently **60 seconds**.

      <Heading variant=\\"pageTitle\\">Rate Limiting</Heading>

      The default rate limit for an Adobe Analytics Company is **120 requests per minute**. (The limit is enforced as **12 requests every 6 seconds**). When rate limiting is being enforced you will get \`429\` HTTP response codes with the following response body: \`{\\"error_code\\":\\"429050\\",\\"message\\":\\"Too many requests\\"}\`
      "
    `);
  });
});
