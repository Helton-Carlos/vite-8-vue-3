import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.ts'],
    ...tseslint.configs.recommended[0],
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
      },
    },
  },
  {
    rules: {
      'vue/multi-word-component-names': 'error',
      'vue/no-unused-vars': 'error',
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['src/view/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
