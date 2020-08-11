const fs = require('fs');
const path = require('path');
const visit = require('unist-util-visit');
const unified = require('unified');
const parse = require('remark-parse');

module.exports = function(markdownAST, pluginOptions) {
  let options = pluginOptions === undefined ? {} : pluginOptions;
  let {directory} = options;

  if (!directory) {
    throw Error(`Required option \"directory\" not specified`);
  } else if (!fs.existsSync(directory)) {
    throw Error(`Invalid directory specified \"${directory}\"`);
  } else if (!directory.endsWith('/')) {
    directory += '/';
  }

  visit(markdownAST, 'inlineCode', function(node) {
    const markdownInclude = node.value;

    if (!markdownInclude.startsWith('markdown:')) {
      return;
    }

    const fileName = markdownInclude.substr(9);
    const fullPath = path.join(directory, fileName)

    if (!fs.existsSync(fullPath)) {
      throw Error(`Invalid fragment specified; no such file "${fullPath}"`);
    }

    try {
      const embeddedMarkdownAST = unified()
          .use(parse)
          .parse(fs.readFileSync(path, 'utf8'));
      node.type = 'parent';
      node.children = embeddedMarkdownAST.children;
      delete node.value;
    } catch (e) {
      throw Error(`${e.message} \nFile: ${fileName}`);
    }
  });
  return markdownAST;
};
