import stylelint from "stylelint";

import { PROPERTY_ORDER } from "./property-groups.mjs";

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint;

/**
 * Local rule: `@include responsive(<prop>, …)` follows the same order as declarations —
 * custom properties (--*) first, then properties by the project group order (property-groups.mjs).
 * Checks each run of consecutive responsive includes in a rule; autofixable.
 */
const ruleName = "local/responsive-order";

const messages = ruleMessages(ruleName, {
  expected: (current, previous) => `Expected "responsive(${current})" to come before "responsive(${previous})"`,
});

const RESPONSIVE_PARAMS = /^responsive\(\s*([\w-]+)/;

/** Property passed to the responsive mixin, null for other at-rules. */
const getResponsiveProp = (node) =>
  node.type === "atrule" && node.name === "include" ? (node.params.match(RESPONSIVE_PARAMS)?.[1] ?? null) : null;

/** Sort weight: custom properties keep their own order before everything, unknown properties go last. */
const getWeight = (prop) => {
  if (prop.startsWith("--")) return -1;
  const index = PROPERTY_ORDER.indexOf(prop);

  return index === -1 ? PROPERTY_ORDER.length : index;
};

/** Runs of consecutive responsive includes (comments right above an include belong to it). */
const getRuns = (parent) => {
  const runs = [];
  let run = [];
  let pendingComments = [];

  parent.each((node) => {
    if (node.type === "comment") {
      pendingComments.push(node);
      return;
    }

    const prop = getResponsiveProp(node);

    if (prop) {
      run.push({ prop, node, comments: pendingComments });
    } else if (run.length) {
      runs.push(run);
      run = [];
    }
    pendingComments = [];
  });
  if (run.length) runs.push(run);

  return runs;
};

const rule = (primary) => (root, result) => {
  if (!validateOptions(result, ruleName, { actual: primary, possible: [true] })) return;

  root.walk((parent) => {
    if (!parent.nodes) return;

    getRuns(parent).forEach((run) => {
      const sorted = [...run].sort((a, b) => getWeight(a.prop) - getWeight(b.prop));
      const firstWrong = run.findIndex((item, index) => item !== sorted[index]);

      if (firstWrong === -1) return;

      const item = sorted[firstWrong];
      const previous = run[firstWrong];

      report({
        ruleName,
        result,
        node: item.node,
        message: messages.expected(item.prop, previous.prop),
        fix: () => {
          /** Re-insert the run in the sorted order after the node that precedes it, keeping the original raws */
          const anchor = (run[0].comments[0] ?? run[0].node).prev();
          const raws = run.map((entry) => (entry.comments[0] ?? entry.node).raws.before);

          sorted.forEach((entry) => {
            entry.comments.forEach((comment) => comment.remove());
            entry.node.remove();
          });

          let previousNode = anchor;
          sorted.forEach((entry, index) => {
            const nodes = [...entry.comments, entry.node];

            nodes.forEach((node, nodeIndex) => {
              if (nodeIndex === 0) node.raws.before = raws[index];
              if (previousNode) previousNode.after(node);
              else parent.prepend(node);
              previousNode = node;
            });
          });
        },
      });
    });
  });
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = { url: "stylelint/responsive-order.mjs", fixable: true };

export default createPlugin(ruleName, rule);
