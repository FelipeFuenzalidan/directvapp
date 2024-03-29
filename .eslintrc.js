module.exports = {
  root: true,
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier/react'],
  parser: 'babel-eslint',
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  globals: {
    __DEV__: true,
    Promise: true,
  },
  plugins: ['babel', 'prettier', 'react', 'react-native', 'react-hooks'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': [
        {
          rootPathPrefix: '~',
          rootPathSuffix: 'src',
        },
        {
          rootPathPrefix: 'mcs',
          rootPathSuffix: 'external_node_modules/mcs',
        },
      ],
      node: { extensions: ['.js', '.ios.js', '.android.js'] },
    },
  },
  rules: {
    'class-methods-use-this': 0,
    'global-require': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/react-in-jsx-scope': 2,
    'react/prop-types': 2,
    'react/destructuring-assignment': [0, 'always'],
    'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    curly: ['error', 'all'],
    'spaced-comment': [2, 'always'],
    'no-use-before-define': 0,
    'import/no-extraneous-dependencies': 0,
    'one-var': [2, { uninitialized: 'always', initialized: 'never' }],
    'import/prefer-default-export': 0,
    'import/no-default-export': 1,
    'babel/new-cap': 1,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'one-var-declaration-per-line': 0,
    'prefer-destructuring': [0, { object: true, array: false }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'import', next: '*' },
      { blankLine: 'any', prev: 'import', next: 'import' },
    ],
    'no-console': 'error',
    'react/no-did-update-set-state': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['src/screens/*.js'],
      rules: {
        'import/no-default-export': 0,
      },
    },
  ],
}
