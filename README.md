# babel-plugin-autocomplete-index [![Actions Status](https://github.com/yangmingshan/babel-plugin-autocomplete-index/workflows/CI/badge.svg)](https://github.com/yangmingshan/babel-plugin-autocomplete-index/actions)

Sometimes you can't omit trailing `index`, but luckily this babel plugin can do it for you.

### In

```js
// if './foo' is a directory

import foo from './foo';

require('./foo');
```

### Out

```js
import foo from './foo/index';

require('./foo/index');
```

This plugin will ignore non-relative path.

## Installation

```
yarn add babel-plugin-autocomplete-index --dev
# OR
npm install babel-plugin-autocomplete-index --save-dev
```

## Usage

`babel.config.js`

```js
'use strict';

module.exports = {
  plugins: [
    'autocomplete-index',
    // other plugins
  ],
};
```

## License

[MIT](https://opensource.org/licenses/MIT)
