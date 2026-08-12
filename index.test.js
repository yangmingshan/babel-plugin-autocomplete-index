import assert from 'node:assert/strict'
import { transformSync, transformFileSync } from '@babel/core'

;(() => {
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
// eslint-disable-next-line no-undef
require(path);
// eslint-disable-next-line no-undef
fn('./foo');`,
  )
})()

;(() => {
  const { code } = transformSync(
    `import './test-files/foo';\nrequire('./test-files/foo');`,
    {
      plugins: ['./index.js'],
    },
  )
  assert.equal(code, `import './test-files/foo';\nrequire('./test-files/foo');`)
})()
