'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function ({ types: t }) {
  return {
    visitor: {
      ImportDeclaration({ node }, { filename }) {
        if (!filename) return;
        const source = path.join(path.dirname(filename), node.source.value);
        try {
          if (fs.statSync(source).isDirectory()) {
            node.source = t.stringLiteral(
              node.source.value +
                (node.source.value.endsWith('/') ? 'index' : '/index')
            );
          }
        } catch {}
      },
    },
  };
};
