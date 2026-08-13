import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { transformSync, transformFileSync } from '@babel/core'

describe('babel-plugin-autocomplete-index', () => {
  test('should autocomplete index files', () => {
    const { code } = transformFileSync('./test-files/index.js', {
      plugins: ['./index.js'],
    })

    assert.equal(
      code,
      `import 'module';
import "./foo/index";
import "./foo/index";
import './bar.js';
import './baz';
require('module');
require("./foo/index");
require("./foo/index");
require('./bar.js');
require('./baz');
require(path);
fn('./foo');`,
    )
  })

  test('should ignore without filename', () => {
    const { code } = transformSync(
      `import './test-files/foo';\nrequire('./test-files/foo');`,
      {
        plugins: ['./index.js'],
      },
    )
    assert.equal(
      code,
      `import './test-files/foo';\nrequire('./test-files/foo');`,
    )
  })
})
