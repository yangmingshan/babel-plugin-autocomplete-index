import fs from 'node:fs'
import path from 'node:path'

function isRelative(value) {
  return (
    value === '.' ||
    value.startsWith('./') ||
    value === '..' ||
    value.startsWith('../')
  )
}

export default function autocompleteIndex({ types: t }) {
  return {
    name: 'autocomplete-index',
    visitor: {
      'ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration|ImportExpression'(
        { node },
        { filename },
      ) {
        if (
          !filename ||
          !t.isStringLiteral(node.source) ||
          !isRelative(node.source.value)
        ) {
          return
        }

        const { value } = node.source
        const source = path.join(path.dirname(filename), value)
        try {
          if (fs.statSync(source).isDirectory()) {
            node.source = t.inheritsComments(
              t.stringLiteral(
                value + (value.endsWith('/') ? 'index' : '/index'),
              ),
              node.source,
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
          !isRelative(node.arguments[0].value)
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
