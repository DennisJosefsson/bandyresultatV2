module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-router/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '.html'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
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
            group: ['@radix-ui/*', '!@radix-ui/react-icons'],
            message:
              'Do not import components directly from @radix-ui, except @radix-ui/react-icons',
          },
        ],
      },
    ],
  },
}
