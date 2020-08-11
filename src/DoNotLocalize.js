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
const toString = require('mdast-util-to-string');

function doNotLocalize(markdownAST) {
  visit(markdownAST, 'linkReference', (node) => {
    if (node.label.includes('!DNL')) {
      let text = toString(node);
      node.type = `text`;
      node.value = text.replace('!DNL', '').trim();
      node.children = undefined;
    }
  });
}

module.exports = doNotLocalize;
