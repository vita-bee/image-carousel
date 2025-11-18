import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Base JS rules
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      prettier,
    },
    rules: {
      // Include ESLint recommended JS rules
      ...js.configs.recommended.rules,

      // Include Prettier formatting via ESLint
      ...prettierConfig.rules,
      'prettier/prettier': 'error',

      // Custom rules
      'no-unused-vars': 'warn',
      'arrow-body-style': ['error', 'always'],
      'capitalized-comments': ['error', 'always'],
    },
  },
];
