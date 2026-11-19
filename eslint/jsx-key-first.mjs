/**
 * local/jsx-key-first: `key` is the first prop of a JSX element (easy to miss it in a long prop list).
 * The rest keeps its order. Autofix moves `key` to the front, keeping the element's prop separator (space or new line).
 *
 * @example
 * <li className="x" key={id}>  →  <li key={id} className="x">
 */
const getIsKey = (attribute) => attribute.type === "JSXAttribute" && attribute.name.name === "key";

export default {
  meta: {
    type: "layout",
    fixable: "code",
    docs: { description: "Require `key` to be the first JSX prop" },
    messages: { keyFirst: "`key` must be the first prop." },
    schema: [],
  },
  create(context) {
    const { sourceCode } = context;

    return {
      JSXOpeningElement(node) {
        const { attributes } = node;
        const keyIndex = attributes.findIndex(getIsKey);

        if (keyIndex <= 0) return;

        const key = attributes[keyIndex];
        const [first, second] = attributes;
        /** Whitespace between props: " " or "\n    " for one prop per line */
        const separator = sourceCode.text.slice(first.range[1], second.range[0]);
        const previous = attributes[keyIndex - 1];

        context.report({
          node: key,
          messageId: "keyFirst",
          fix: (fixer) => [
            fixer.removeRange([previous.range[1], key.range[1]]),
            fixer.insertTextBefore(first, `${sourceCode.getText(key)}${separator}`),
          ],
        });
      },
    };
  },
};
