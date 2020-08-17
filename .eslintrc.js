'use strict';

const isProd = process.env.NODE_ENV === 'production';

const config = {
  root: true,
  extends: [
    'xo/esnext',
    require.resolve('xo/config/plugins'),
    'plugin:prettier/recommended',
    'prettier/unicorn',
  ],
  ignorePatterns: ['test-files'],
  rules: {
    'no-console': 'error',
  },
};

if (!isProd) {
  config.extends = [
    ...config.extends,
    'silent',
    'silent/import',
    'silent/prettier',
    'silent/unicorn',
  ];
}

module.exports = config;
