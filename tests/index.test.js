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
const doNotLocalize = require("../src/DoNotLocalize")
const admonitions = require("../src/Admonitions")
const includeRelative = require("../src/IncludeRelative")
const fixInvalidTags = require("../src/FixInvalidTags")
const {
  getMarkdownASTForFile,
  parseASTToMarkdown,
} = require("./helpers/markdown")
const plugin = require("../index")

const path = require("path")
const projectRootDir = path.dirname(__dirname)
const testOptions = {
  directory: `${projectRootDir}/tests/fixtures/`,
}

describe("fixInvalidTags", () => {
  it("is truthy", () => {
    expect(fixInvalidTags).toBeTruthy()
  })
  it("can detect and fix these open HTML tags: br, hr, and img", async () => {
    const markdownAST = getMarkdownASTForFile(
      "markdown-with-open-html-tags",
      true
    )
    const processedAST = await plugin({ markdownAST }, testOptions)

    expect(processedAST).toMatchSnapshot()
  })
  it("does nothing with the properly closed br, hr, and img tags in a markdown file", async () => {
    const markdownAST = getMarkdownASTForFile(
      "markdown-with-closed-html-tags",
      true
    )
    const processedAST = await plugin({ markdownAST }, testOptions)

    expect(processedAST).toMatchSnapshot()
  })
  it("works with a mix of properly closed and open br, hr, and img tags in a markdown file", async () => {
    const markdownAST = getMarkdownASTForFile(
      "markdown-with-closed-and-open-html-tags",
      true
    )
    const processedAST = await plugin({ markdownAST }, testOptions)

    expect(processedAST).toMatchSnapshot()
  })
  it("closes open tags in any included markdown files", async () => {
    const markdownAST = getMarkdownASTForFile(
      "markdown-include-with-open-tags",
      true
    )
    const processedAST = await plugin({ markdownAST }, testOptions)

    expect(processedAST).toMatchSnapshot()
  })
})

describe("includeRelative", () => {
  it("is truthy", () => {
    expect(includeRelative).toBeTruthy()
  })
  it("can detect and render include within markdown which itself has an include", async () => {
    const markdownAST = getMarkdownASTForFile("include-relative", true)
    const processedAST = await plugin({ markdownAST }, testOptions)

    expect(processedAST).toMatchSnapshot()
  })

  it("can properly render admonitions within the contents of the included files", async () => {
    const markdownAST = getMarkdownASTForFile("aepcs-api-reference", true)
    const processedAST = await plugin({ markdownAST }, testOptions)

    expect(processedAST).toMatchSnapshot()
  })
})

describe("doNotLocalize", () => {
  it("is truthy", () => {
    expect(doNotLocalize).toBeTruthy()
  })
  it("can transform !DNL tags", async () => {
    const markdownAST = getMarkdownASTForFile("do-not-localize", true)
    const processedAST = await plugin({ markdownAST }, testOptions)
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      Adobe
      "
    `)
  })
})

describe("admonitions", () => {
  it("is truthy", () => {
    expect(admonitions).toBeTruthy()
  })
  it("can transform !Note tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-note", true)
    const processedAST = await plugin({ markdownAST }, testOptions)
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Note\\" variant=\\"info\\">This is a standard NOTE block.</Alert>
      "
    `)
  })
  it("can transform !Caution tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-caution", true)
    const processedAST = await plugin({ markdownAST }, testOptions)
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Caution\\" variant=\\"error\\">This is a standard CAUTION block.</Alert>
      "
    `)
  })
  it("can transform !Warning tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-warning", true)
    const processedAST = await plugin({ markdownAST }, testOptions)
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Warning\\" variant=\\"warning\\">This is a standard WARNING block.</Alert>
      "
    `)
  })
  it("can transform !Tip tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-tip", true)
    const processedAST = await plugin({ markdownAST }, testOptions)
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Tip\\" variant=\\"help\\">This is a standard TIP block.</Alert>
      "
    `)
  })
  it("can transform multi-line tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-multiline", true)
    const processedAST = await plugin({ markdownAST }, testOptions)
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Warning\\" variant=\\"warning\\">This is a standard WARNING block.
      It goes on for a few lines.
      Then we finish with some more text.</Alert>

      Like So
      "
    `)
  })
  it("can transform inline tags", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-inline", true)
    const processedAST = await plugin({ markdownAST }, testOptions)
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Note\\" variant=\\"info\\"> Only a user with sufficient rights can create a property. See <a href=\\"user-permissions.md\\">User Management</a>.</Alert>

      Like So
      "
    `)
  })
  it("can transform tags with embedded urls", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-url", true)
    const processedAST = await plugin({ markdownAST }, testOptions)
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Warning\\" variant=\\"warning\\">Before <a href=\\"https://example.com\\">website</a> After</Alert>
      "
    `)
  })
  it("header with multiple spaces", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-note-2-spaces", true)
    const processedAST = await plugin({ markdownAST }, testOptions)
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Note\\" variant=\\"info\\">This is a standard NOTE block.</Alert>
      "
    `)
  })
  it("body with multiple paragraphs", async () => {
    const markdownAST = getMarkdownASTForFile(
      "admonitions-note-2-paragraphs",
      true
    )
    const processedAST = await plugin({ markdownAST }, testOptions)
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Note\\" variant=\\"info\\">This is a <a href=\\"https://example.com\\">website</a> NOTE block.<br/><br/>And after an empty line here's another line of text</Alert>
      "
    `)
  })
  it("body with bold text", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-note-bold", true)
    const processedAST = await plugin({ markdownAST }, testOptions)
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Note\\" variant=\\"info\\">This is a <b>bold</b> NOTE block.</Alert>
      "
    `)
  })
  it("body with italic text", async () => {
    const markdownAST = getMarkdownASTForFile("admonitions-note-italic", true)
    const processedAST = await plugin({ markdownAST }, testOptions)
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Note\\" variant=\\"info\\">This is a <i>italic</i> NOTE block.</Alert>
      "
    `)
  })
  it("body with inline code text", async () => {
    const markdownAST = getMarkdownASTForFile(
      "admonitions-note-inline-code",
      true
    )
    const processedAST = await plugin({ markdownAST }, testOptions)
    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "# Don't Delete:

      For some reason we need at least one markdown file in the markdown-pages directory in order for the build to succeed

      <Alert header=\\"Note\\" variant=\\"info\\">This is a <code>inline code</code> NOTE block.</Alert>
      "
    `)
  })
})
