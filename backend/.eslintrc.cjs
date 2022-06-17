module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'max-len': ['error', { code: 200 }],
  },
};
