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
const doNotLocalize = require("../src/DoNotLocalize");
const admonitions = require("../src/Admonitions");
const includeRelative = require("../src/IncludeRelative");
const hero = require("../src/Hero");
// const tabbedCodeBlocks = require("../src/TabbedCodeBlocks");
const {
  getMarkdownASTForFile,
  parseASTToMarkdown,
} = require("./helpers/markdown");
const plugin = require("../index");
const fs = require("fs");

describe("Hero", () => {
  it("is truthy", () => {
    expect(hero).toBeTruthy();
  });
  it("can transform into Hero", async () => {
    const markdownAST = getMarkdownASTForFile("hero", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "<div><hero image=\\"https://raw.githubusercontent.com/adobe/gatsby-theme-spectrum-example/main/src/pages/illustration.png\\" heading=\\"Adobe Analytics\\" text=\\"Adobe Product API offers limitless ways to integrate your most important customer data into key business processes. Adobe Product API offer limitless ways.\\"></hero></div>

      ## Hero test

      This was a test of the Hero component

      ![Hero image](./illustration.png)

      # Adobe Analytics

      Adobe Product API offers limitless ways to integrate your most important customer data into key business processes. Adobe Product API offer limitless ways.

      <Resources slots=\\"heading, links\\"/>

      #### Resources

      -   [Quickstart Guide](https://adobe.io)
      -   [Adobe Analytics Github Repo](https://adobe.io)

      ## Overview

      This documentation provides instructions for Adobe Analytics 2.0 APIs. For working with Analytics 1.4 APIs, see [Analytics 1.4 API Documentation](https://adobe.io).

      The Adobe Analytics APIs are a collection of APIs that power Adobe Analytics products like Analysis Workspace.
      The APIs allow for the creation of data rich user interfaces that you can use to manipulate and integrate data.
      You can also create reports to explore, get insights, or answer important questions about your data.

      ## Discover

      <ContentBlock width=\\"100%\\" slots=\\"heading, link, text\\"/>

      ### Get Started

      [Quickstart Guide](https://adobe.io)

      Get started with the Adobe Analytics APIs.

      <ContentBlock slots=\\"heading, link, text\\"/>

      ### Guides

      [Calculated Metrics API](https://adobe.io)

      Returns information on the user's company that is necessary for making other Adobe Analytics API calls.

      <ContentBlock slots=\\"link, text\\"/>

      [Segments API](https://adobe.io)

      Provides configuration guidance and best practices for the /segments endpoint.

      <ContentBlock slots=\\"link, text\\"/>

      [Reporting Guide API](https://adobe.io)

      Provides configuration guidance and best practices for the /reports endpoint.

      <ContentBlock width=\\"100%\\" slots=\\"heading, link, text\\"/>

      ### API References

      [Try the API](https://adobe.io)

      Try the Analytics API with Swagger UI. Explore, make calls, with full endpoint descriptions.

      ## Contributing

      We encourage you to participate in our open documentation initiative, if you have suggestions, corrections, additions
      or deletions for this documentation, check out the source from [this github repo](https://adobe.io), and submit a pull
      request with your contribution. For more information, refer to the [contributing page](https://adobe.io).

      ## API Requests & Rate Limits

      The timeout for API requests through adobe.io is currently _60 seconds_.

      The default rate limit for an Adobe Analytics Company is _120 requests per minute_. (The limit is enforced as _12 requests every 6 seconds_).
      When rate limiting is being enforced you will get \`429\` HTTP response codes with the following response body: \`{\\"error_code\\":\\"429050\\",\\"message\\":\\"Too many requests\\"}\`
      "
    `);
  });
});

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
  it("can transform inline tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-inline", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

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
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Warning\\" variant=\\"warning\\">Before <a href=\\"https://example.com\\">website</a> After</Alert>
      "
    `);
  });
});

/*
describe("tabbedCodeBlocks", () => {
  it("is truthy", () => {
    expect(tabbedCodeBlocks).toBeTruthy();
  });
  it("can convert multiple code blocks into tabs", async () => {
    const markdownAST = getMarkdownASTForFile("tabbed-code-blocks", true);
    const processedAST = await plugin({ markdownAST });
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Tabbed code blocks

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
*/
