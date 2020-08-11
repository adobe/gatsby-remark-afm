const includeWithInclude = {
  children: [
    {
      children: [{ position: { end: { column: 7, line: 1, offset: 6 }, indent: [], start: { column: 1, line: 1, offset: 0 } }, type: 'text', value: 'before' }],
      position: { end: { column: 7, line: 1, offset: 6 }, indent: [], start: { column: 1, line: 1, offset: 0 } },
      type: 'paragraph',
    },
    {
      children: [
        { position: { end: { column: 10, line: 3, offset: 17 }, indent: [], start: { column: 1, line: 3, offset: 8 } }, type: 'text', value: 'more text' },
      ],
      position: { end: { column: 10, line: 3, offset: 17 }, indent: [], start: { column: 1, line: 3, offset: 8 } },
      type: 'paragraph',
    },
    {
      children: [
        {
          children: [
            {
              position: { end: { column: 10, line: 1, offset: 9 }, indent: [], start: { column: 1, line: 1, offset: 0 } },
              type: 'text',
              value: 'Some text',
            },
          ],
          position: { end: { column: 10, line: 1, offset: 9 }, indent: [], start: { column: 1, line: 1, offset: 0 } },
          type: 'paragraph',
        },
        {
          children: undefined,
          position: { end: { column: 36, line: 5, offset: 61 }, indent: [1, 1], start: { column: 1, line: 3, offset: 11 } },
          type: 'html',
          value: '<Alert header="Caution" variant="error">This is a standard CAUTION block.</Alert>',
        },
      ],
      position: { end: { column: 37, line: 5, offset: 55 }, indent: [], start: { column: 1, line: 5, offset: 19 } },
      type: 'include',
    },
    {
      children: [
        { position: { end: { column: 6, line: 7, offset: 62 }, indent: [], start: { column: 1, line: 7, offset: 57 } }, type: 'text', value: 'after' },
      ],
      position: { end: { column: 6, line: 7, offset: 62 }, indent: [], start: { column: 1, line: 7, offset: 57 } },
      type: 'paragraph',
    },
  ],
  position: { end: { column: 1, line: 8, offset: 63 }, start: { column: 1, line: 1, offset: 0 } },
  type: 'root',
};

const includesWithAdmonitions = {
  children: [
    {
      children: [
        {
          children: [
            {
              position: { end: { column: 28, line: 1, offset: 27 }, indent: [], start: { column: 4, line: 1, offset: 3 } },
              type: 'text',
              value: 'acppath_delete_asset_top',
            },
          ],
          depth: 2,
          position: { end: { column: 28, line: 1, offset: 27 }, indent: [], start: { column: 1, line: 1, offset: 0 } },
          type: 'heading',
        },
        {
          children: [
            {
              position: { end: { column: 32, line: 3, offset: 60 }, indent: [], start: { column: 1, line: 3, offset: 29 } },
              type: 'text',
              value: 'Some text for delete asset top.',
            },
          ],
          position: { end: { column: 32, line: 3, offset: 60 }, indent: [], start: { column: 1, line: 3, offset: 29 } },
          type: 'paragraph',
        },
        {
          children: undefined,
          position: { end: { column: 36, line: 7, offset: 112 }, indent: [1, 1], start: { column: 1, line: 5, offset: 62 } },
          type: 'html',
          value: '<Alert header="Caution" variant="error">This is a standard CAUTION block.</Alert>',
        },
      ],
      position: { end: { column: 58, line: 1, offset: 57 }, indent: [], start: { column: 1, line: 1, offset: 0 } },
      type: 'include',
    },
    {
      children: [
        {
          children: [
            {
              position: { end: { column: 31, line: 1, offset: 30 }, indent: [], start: { column: 4, line: 1, offset: 3 } },
              type: 'text',
              value: 'acppath_delete_asset_params',
            },
          ],
          depth: 2,
          position: { end: { column: 31, line: 1, offset: 30 }, indent: [], start: { column: 1, line: 1, offset: 0 } },
          type: 'heading',
        },
        {
          children: [
            {
              position: { end: { column: 28, line: 3, offset: 59 }, indent: [], start: { column: 1, line: 3, offset: 32 } },
              type: 'text',
              value: 'Good text for a good topic.',
            },
          ],
          position: { end: { column: 28, line: 3, offset: 59 }, indent: [], start: { column: 1, line: 3, offset: 32 } },
          type: 'paragraph',
        },
        {
          children: undefined,
          position: { end: { column: 36, line: 7, offset: 111 }, indent: [1, 1], start: { column: 1, line: 5, offset: 61 } },
          type: 'html',
          value: '<Alert header="Caution" variant="error">This is a standard CAUTION block.</Alert>',
        },
      ],
      position: { end: { column: 69, line: 3, offset: 127 }, indent: [], start: { column: 1, line: 3, offset: 59 } },
      type: 'include',
    },
    {
      children: [
        {
          children: [
            {
              position: { end: { column: 31, line: 1, offset: 30 }, indent: [], start: { column: 4, line: 1, offset: 3 } },
              type: 'text',
              value: 'acppath_delete_asset_bottom',
            },
          ],
          depth: 2,
          position: { end: { column: 31, line: 1, offset: 30 }, indent: [], start: { column: 1, line: 1, offset: 0 } },
          type: 'heading',
        },
        {
          children: [
            {
              position: { end: { column: 41, line: 3, offset: 72 }, indent: [], start: { column: 1, line: 3, offset: 32 } },
              type: 'text',
              value: 'Some text for delete asset bottom topic.',
            },
          ],
          position: { end: { column: 41, line: 3, offset: 72 }, indent: [], start: { column: 1, line: 3, offset: 32 } },
          type: 'paragraph',
        },
        {
          children: undefined,
          position: { end: { column: 36, line: 7, offset: 124 }, indent: [1, 1], start: { column: 1, line: 5, offset: 74 } },
          type: 'html',
          value: '<Alert header="Caution" variant="error">This is a standard CAUTION block.</Alert>',
        },
      ],
      position: { end: { column: 61, line: 5, offset: 189 }, indent: [], start: { column: 1, line: 5, offset: 129 } },
      type: 'include',
    },
  ],
  position: { end: { column: 1, line: 6, offset: 190 }, start: { column: 1, line: 1, offset: 0 } },
  type: 'root',
};

const testTrees = {
  includeWithInclude: includeWithInclude,
  includesWithAdmonitions: includesWithAdmonitions,
};

const getAstData = (testTree) => {
  if (testTree === testTrees.includeWithInclude) return includeWithInclude;
  if (testTree === testTrees.includesWithAdmonitions) return includesWithAdmonitions;
};

module.exports = {
  getAstData: getAstData,
  testTrees: testTrees,
};
