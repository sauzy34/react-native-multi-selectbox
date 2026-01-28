module.exports = {
  root: true,
  extends: ['react-app', 'prettier'],
  plugins: ['prettier', 'react-hooks'],
  globals: {
    document: true,
    window: true,
    process: true,
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
        semi: false,
        printWidth: 120,
        jsxBracketSameLine: true,
      },
    ],
    'react/react-in-jsx-scope': 0,
    radix: 0,
  },
};
