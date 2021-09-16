# gatsby-remark-afm

Enhances github flavoured markdown with Adobe extensions

## Important

Use this **before** `gatsby-remark-external-links`

## Installation

```bash
npm add @adobe/gatsby-remark-afm
```

## Usage

This plugin can be used with `gatsby-transformer-remark` or `gatsby-plugin-mdx`.

To use it with `gatsby-transformer-remark`, add it to your `gatsby-config.js` like this:

```js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `@adobe/gatsby-remark-afm`,
          options: {
            directory: `${__dirname}/path-to-markdown-files`,
          },
        },
        'gatsby-remark-external-links',
      ]
    }
  },
```

To use it with `gatsby-plugin-mdx`, add it to your `gatsby-config.js` like this:

```js
{
  resolve: `gatsby-plugin-mdx`,
  options: {
    extensions: [`.mdx`, `.md`],
    gatsbyRemarkPlugins: [
      {
        resolve: `@adobe/gatsby-remark-afm`,
        options: {
          directory: `${__dirname}/path-to-markdown-files`,
        },
      },
    ],
  },
},
```

## Options

`directory` - The absolute path to the directory where you keep your markdown files for your site.

This option is required to resolve the plugin's include feature `{% include_relative path/to/markdown-file.md %}`, which allows writers to include the contents from one markdown file into another.

Adding this directory path ensures that the plugin can find your site's markdown files to include. All markdown files in sub-directories of the `directory` path will also be processed and made available as needed.


## License

[Apache-2.0](LICENSE)

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.
