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

function cleanHtml(markdownAST, pluginOptions) {
  visit(markdownAST, 'html', (node) => {
    let html = node.value;

    const openImg = html.match(/<img\s*(.*?)[^/](>)/);
    if (openImg) {
      const closedImg = openImg[0].split('>').join('/>');
      html = html.split(openImg[0]).join(closedImg);
    }

    const cleanedHtml = html
      .split('<br>')
      .join('<br/>')
      .split('<hr>')
      .join('<hr/>');

    try {
      node.value = cleanedHtml;
    } catch (e) {
      throw Error(`${e.message}`);
    }
  });
}

module.exports = cleanHtml;
