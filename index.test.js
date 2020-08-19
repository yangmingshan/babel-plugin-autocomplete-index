'use strict';

const assert = require('assert').strict;
const babel = require('@babel/core');

(() => {
  const { code } = babel.transformFileSync('./test-files/index.js', {
    plugins: ['./index.js'],
  });

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

fn('./foo');`
  );
})();

(() => {
  const { code } = babel.transformSync(
    `import './test-files/foo';\nrequire('./test-files/foo');`,
    {
      plugins: ['./index.js'],
    }
  );
  assert.equal(
    code,
    `import './test-files/foo';\n\nrequire('./test-files/foo');`
  );
})();
