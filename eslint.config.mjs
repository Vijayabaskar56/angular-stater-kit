import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { tanstackConfig } from "@tanstack/eslint-config";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tanstackConfig,
  ...tseslint.configs.recommended,
];
