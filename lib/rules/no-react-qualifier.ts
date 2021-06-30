import { ESLintUtils } from "@typescript-eslint/experimental-utils";
import { Identifier } from "estree";

export default ESLintUtils.RuleCreator((ruleName) => ruleName)({
  name: "no-react-qualifier",
  meta: {
    type: "suggestion",
    docs: {
      category: "Best Practices",
      description: "Do not use React qualifier.",
      recommended: "error"
    },
    schema: [],
    messages: {
      noReactQualifier: "Do not use React qualifier, use import deconstruction instead"
    }
  },
  defaultOptions: [],

  create: (context) => {
    return {
      TSQualifiedName(node) {
        if ((node.left as Identifier).name === "React") {
          context.report({
            node,
            messageId: "noReactQualifier"
          });
        }
      }
    };
  }
});
