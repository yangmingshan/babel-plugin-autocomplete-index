# babel-plugin-autocomplete-index

Sometimes you can't omit trailing `index`, but luckily this babel plugin can do it for you.

### In

```js
// if './foo' is a directory

import foo from './foo'

export { foo } from './foo'

export * from './foo'

import('./foo')

require('./foo')
```

### Out

```js
import foo from './foo/index'

export { foo } from './foo/index'

export * from './foo/index'

import('./foo/index')

require('./foo/index')
```

This plugin will ignore non-relative path.

## Installation

```sh
npm install babel-plugin-autocomplete-index --save-dev
```

## Usage

`babel.config.js`

```js
const config = {
  plugins: [
    'autocomplete-index',
    // other plugins
  ],
}

export default config
```

## License

[MIT](https://opensource.org/licenses/MIT)
