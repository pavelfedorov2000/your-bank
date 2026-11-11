import { PROPERTY_GROUPS } from "./stylelint/property-groups.mjs";

/**
 * Style lint: only the project order rules (no stylistic presets).
 * Inside a rule: CSS variables → SCSS variables → declarations (by property groups) →
 * other mixins (anywhere) → `@include responsive(…)` always at the bottom (same order) → nested rules.
 */
/** @type {import("stylelint").Config} */
export default {
  customSyntax: "postcss-scss",
  plugins: ["stylelint-order", "./stylelint/responsive-order.mjs"],
  rules: {
    "order/order": [
      [
        "custom-properties",
        "dollar-variables",
        "declarations",
        { type: "at-rule", name: "include", parameter: "^responsive" },
        "rules",
      ],
      { unspecified: "ignore" },
    ],
    "order/properties-order": [
      PROPERTY_GROUPS.map(({ groupName, properties }) => ({ groupName, properties })),
      { unspecified: "bottomAlphabetical" },
    ],
    "local/responsive-order": true,
  },
};
