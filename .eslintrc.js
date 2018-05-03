module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: { browser: true },
  extends: [
    'standard',
    'plugin:vue/recommended',
    'prettier'
  ],
  plugins: ['vue'],
  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0
  },
  globals: {}
}
