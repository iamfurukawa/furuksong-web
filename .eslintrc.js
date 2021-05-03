module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['es-beautifier'],
  extends: [
    'plugin:vue/essential',
    'plugin:es-beautifier/standard',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 0,
  },
};
