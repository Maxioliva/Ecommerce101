module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ['promise', '@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    // 'plugin:jsx-a11y/recommended',
  ],
  settings: { react: { version: 'detect' } },
  rules: {
    // Customization of recommended rules
    'no-empty': ['warn', { allowEmptyCatch: true }],
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'off',

    // Temporarily disabled rules (that should be enabled at some point)
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',

    // Custom rules
    'array-callback-return': 'error',
    'arrow-body-style': 'error',
    'consistent-return': 'error',
    curly: 'error',
    'dot-notation': 'error',
    eqeqeq: 'error',
    'func-style': ['error', 'expression'],
    'no-duplicate-imports': 'error',
    'no-lone-blocks': 'error',
    'no-multi-assign': 'error',
    'no-param-reassign': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'off',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    'no-useless-return': 'error',
    'no-void': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-object-spread': 'error',
    'prefer-regex-literals': 'error',
    'prefer-spread': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    yoda: 'error',
    'promise/prefer-await-to-then': 'error',
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    // '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/non-nullable-type-assertion-style': 'error',
    // '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error',
    'no-restricted-syntax': [
      'error',
      'TSEnumDeclaration',
      'ForStatement',
      'ForOfStatement',
      'ForInStatement',
      'SwitchStatement',
    ],
  },
  ignorePatterns: ['.eslintrc.js', 'webpack.config.js'],
};
