# gatsby-remark-afm

Enhances github flavoured markdown with Adobe extensions

## Important

Use this **before** `gatsby-remark-external-links`

## Installation

```bash
npm add @parliament/gatsby-remark-afm
```

## Usage

Add following to your `gatsby-config.js`:

```js
    plugins: [
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            '@parliament/gatsby-remark-afm',
            'gatsby-remark-external-links',
          ]
        }
      },
```

## License

[Apache-2.0](LICENSE)

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.
