import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // @vitejs/plugin-react v6 enables React Compiler by default. Disable rules that
      // produce false positives for supported third-party patterns:
      //   incompatible-library: TanStack Table is a known incompatible library but works fine at runtime
      //   refs: react-hook-form passes a callback ref (field.ref) to DOM elements — this is valid
      //         but the rule incorrectly treats it as a RefObject.current access during render
      'react-hooks/incompatible-library': 'off',
      'react-hooks/refs': 'off',
      // shadcn/ui intentionally co-locates variant helpers and hooks with their components.
      // allowExportNames permits these specific named utilities alongside component exports.
      'react-refresh/only-export-components': [
        'error',
        {
          allowConstantExport: true,
          allowExportNames: [
            'badgeVariants',
            'buttonVariants',
            'useFormField',
            'navigationMenuTriggerStyle',
            'useSidebar',
          ],
        },
      ],
    },
  },
]);
