'use strict';

module.exports = {
  '**/*.js': (filenames) => [
    `cross-env NODE_ENV=production eslint --fix ${filenames.join(' ')}`,
  ],
};
