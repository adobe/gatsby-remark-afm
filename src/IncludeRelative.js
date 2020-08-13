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

const visit = require('unist-util-visit');
const fs = require('fs');
const normalizePath = require('normalize-path');
const unified = require('unified');
const parse = require('remark-parse');

function includeRelative(markdownAST, pluginOptions) {
  let options = pluginOptions === void 0 ? null : pluginOptions,
    directory = options.directory;

  if (!directory) {
    throw Error(`Required option \"directory\" not specified`);
  } else if (!fs.existsSync(directory)) {
    throw Error(`Invalid directory specified \"${directory}\"`);
  } else if (!directory.endsWith('/')) {
    directory += '/';
  }

  visit(markdownAST, 'paragraph', (node) => {
    if (node.children.length === 1) {
      for (let child of node.children) {
        let text = child.value;
        if (text) {
          const matches = text.match(/{%\s*include_relative\s*(.*?)\s*%}/g);
          if (matches && matches.length > 0) {
            for (const match of matches) {
              let filename = match
                .replace('{%', '')
                .replace('%}', '')
                .replace('include_relative', '')
                .trim();

              const file = text.replace(match, filename);
              // const fileAbsoluteDir = fileAbsolutePath.substring(0, fileAbsolutePath.lastIndexOf('/'));
              // const path = normalizePath(`${fileAbsoluteDir}${file}`);
              const path = normalizePath(`${directory}${file}`);

              if (!fs.existsSync(path)) {
                throw Error(`Invalid fragment specified; no such file "${path}"`);
              }

              try {
                const embedMarkdownAST = unified()
                  .use(parse)
                  .parse(fs.readFileSync(path, 'utf8'));
                node.type = 'include';
                node.children = embedMarkdownAST.children;
                delete node.value;
              } catch (e) {
                throw Error(`${e.message} \nFile: ${file}`);
              }
            }
          }
        }
      }
    }
  });
}

module.exports = includeRelative;
