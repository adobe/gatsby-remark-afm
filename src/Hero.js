const markdown = require("../tests/helpers/markdown");

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
const select = require("unist-util-select").select;

function hero(markdownAST) {
  const image = select("paragraph > image", markdownAST);
  const heading = select("paragraph + heading", markdownAST);
  const text = select("paragraph + heading + paragraph", markdownAST);

  if (image && heading && heading.depth === 1 && text) {
    // Replace the first child with the Hero component
    let html = `<div><hero image="${image.url}" heading="${heading.children[0].value}" text="${text.children[0].value}"></hero></div>`;
    markdownAST.children[0] = {
      type: "html",
      children: undefined,
      value: html,
    };
    // Remove the second and third children as we don't need them anymore
    markdownAST.children.splice(1, 2);
  }
}

module.exports = hero;
