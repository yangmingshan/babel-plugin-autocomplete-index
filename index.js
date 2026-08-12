import fs from 'node:fs'
import path from 'node:path'

export default function autocompleteIndex({ types: t }) {
  return {
    name: 'autocomplete-index',
    visitor: {
      ImportDeclaration({ node }, { filename }) {
        const { value } = node.source
        if (!filename || !value.startsWith('.')) return
        const source = path.join(path.dirname(filename), value)
        try {
          if (fs.statSync(source).isDirectory()) {
            node.source = t.stringLiteral(
              value + (value.endsWith('/') ? 'index' : '/index'),
            )
          }
          // eslint-disable-next-line no-empty
        } catch {}
      },
      CallExpression({ node }, { filename }) {
        if (
          !filename ||
          node.callee.name !== 'require' ||
          !t.isStringLiteral(node.arguments[0]) ||
          !node.arguments[0].value.startsWith('.')
        ) {
          return
        }

        const { value } = node.arguments[0]
        const source = path.join(path.dirname(filename), value)
        try {
          if (fs.statSync(source).isDirectory()) {
            node.arguments[0] = t.stringLiteral(
              value + (value.endsWith('/') ? 'index' : '/index'),
            )
          }
          // eslint-disable-next-line no-empty
        } catch {}
      },
    },
  }
}
