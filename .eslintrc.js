module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
      objectRestSpread: true,
      optionalChaining: true
    }
  },
  env: {
    es6: true,
    node: true,
  },
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['react', 'react-native', 'react-hooks'],
  globals: {
    describe: false,
    it: false,
    expect: false,
    document: false,
    window: false
  }
};
