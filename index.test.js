import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { transformAsync, transformFileAsync } from '@babel/core'

describe('babel-plugin-autocomplete-index', () => {
  test('should autocomplete index files', async () => {
    const { code } = await transformFileAsync('./test-files/index.js', {
      plugins: ['./index.js'],
    })

    assert.equal(
      code,
      `import 'module';
import "./foo/index";
import "./foo/index";
import './bar.js';
import './baz';
export { a } from 'module';
export { b } from "./foo/index";
export { c } from "./foo/index";
export { d } from './bar.js';
export { e } from './baz';
export * from 'module';
export * from "./foo/index";
export * from "./foo/index";
export * from './bar.js';
export * from './baz';
import('module');
import("./foo/index");
import("./foo/index");
import('./bar.js');
import('./baz');
import(path);
require('module');
require("./foo/index");
require("./foo/index");
require('./bar.js');
require('./baz');
require(path);
fn('./foo');`,
    )
  })

  test('should ignore without filename', async () => {
    const { code } = await transformAsync(
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

  test('local exports', async () => {
    const input = `const foo = 1;
export { foo };
export const bar = 2;
export default foo;`

    const { code } = await transformAsync(input, {
      filename: './test-files/index.js',
      plugins: ['./index.js'],
    })

    assert.equal(code, input)
  })

  test('dynamic import comments and options', async () => {
    const { code } = await transformAsync(
      `import(/* webpackChunkName: "foo" */ './foo', { with: { type: 'json' } });`,
      {
        filename: './test-files/index.js',
        plugins: ['./index.js'],
      },
    )

    assert.equal(
      code,
      `import(/* webpackChunkName: "foo" */"./foo/index", {
  with: {
    type: 'json'
  }
});`,
    )
  })

  test('require comments', async () => {
    const { code } = await transformAsync(
      `require(/* webpackIgnore: true */ './foo');`,
      {
        filename: './test-files/index.js',
        plugins: ['./index.js'],
      },
    )

    assert.equal(code, `require(/* webpackIgnore: true */"./foo/index");`)
  })
})
