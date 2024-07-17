module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '.html'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'eslint-plugin-react-compiler'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react-compiler/react-compiler': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            importNames: ['Form'],
            message: 'Import Form from ui/form instead.',
            name: 'react-hook-form',
          },
        ],
        patterns: [
          {
            regex: '@radix-ui',
            message: "Don't import directly from @radix-ui",
          },
        ],
      },
    ],
  },
}
