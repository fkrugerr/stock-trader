module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eol-last': ["error", "always"],
    'arrow-parens': ["error", "always"],
    'max-len': ["error", 100, 2, {
      "ignoreUrls": true,
      "ignoreComments": false,
      "ignoreRegExpLiterals": true,
      "ignoreStrings": true,
      "ignorePattern": "class=",
      "ignoreTemplateLiterals": false,
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
