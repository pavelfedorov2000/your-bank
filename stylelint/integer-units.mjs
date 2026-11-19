import stylelint from "stylelint";

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

/**
 * Local rule: percentages and angles are whole numbers (29.4% → 29%, 122.7deg → 123deg) — the design precision is ~1,
 * fractions only come from conversions (Figma gradient handles, px → %). Checks property values and
 * mixin arguments (`@include responsive(width, (100%, null, 42.6%))`); autofixable (Math.round).
 */
const ruleName = "local/integer-units";

const messages = ruleMessages(ruleName, {
  expected: (actual, expected) => `Expected "${actual}" to be a whole number "${expected}"`,
});

/** A number with a fractional part followed by % or deg: "42.6%", "-4.7%", "122.7deg" (not part of a word / selector) */
const FRACTIONAL_VALUE = /(?<![\w.#-])(-?\d*\.\d+)(%|deg)(?![\w-])/g;

/** Rounded value with its unit; "-0" after rounding a small negative value reads as "0" */
const roundValue = (value, unit) => `${Math.round(Number(value)) || 0}${unit}`;

const rule = (primary) => (root, result) => {
  if (!validateOptions(result, ruleName, { actual: primary, possible: [true] })) return;

  const check = (node, key) => {
    const value = node[key];
    const matches = [...value.matchAll(FRACTIONAL_VALUE)];

    matches.forEach(([actual, number, unit]) => {
      report({
        ruleName,
        result,
        node,
        word: actual,
        message: messages.expected(actual, roundValue(number, unit)),
        fix: () => {
          node[key] = node[key].replace(actual, roundValue(number, unit));
        },
      });
    });
  };

  root.walkDecls((decl) => check(decl, "value"));
  root.walkAtRules("include", (atRule) => check(atRule, "params"));
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = { url: "stylelint/integer-units.mjs", fixable: true };

export default createPlugin(ruleName, rule);
