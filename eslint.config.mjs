import tsParser from "@typescript-eslint/parser";
import stylistic from "@stylistic/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";

/**
 * Code lint: only the import order for now (`npm run lint:fix` sorts them, also runs before `develop`).
 *
 * Groups (blank line between them), each group in the order of its patterns:
 * 1. React, Gatsby, other packages
 * 2. Images (@images/…)
 * 3. Components: layout → ui → content → sections → sibling components (./X)
 * 4. Project code: @box hooks → utils → constants → types → modules (@box/tabs), then @features, @data
 * 5. Styles: packages first (swiper/css), then own (./X.scss) — own rules must come later to override
 */
const IMPORT_GROUPS = [
  ["^react$", "^gatsby", "^@?\\w"],
  ["^@images/"],
  ["^@components/layout", "^@components/ui", "^@components/content", "^@components/sections", "^\\.\\.?/(?!.*\\.s?css$)"],
  ["^@box/hooks", "^@box/utils", "^@box/constants", "^@box/types", "^@box/", "^@features/", "^@data/"],
  ["^\\u0000(?!\\.)", "^\\u0000.*\\.s?css$"],
];

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ["public/**", ".cache/**", "node_modules/**", "src/gatsby-types.d.ts"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { "simple-import-sort": simpleImportSort, "@stylistic": stylistic },
    rules: {
      "simple-import-sort/imports": ["error", { groups: IMPORT_GROUPS }],
      "simple-import-sort/exports": "off",
      /** Sorting names inside { } keeps the original spacing: restore "a, b" after a move */
      "@stylistic/comma-spacing": ["error", { before: false, after: true }],
    },
  },
];
