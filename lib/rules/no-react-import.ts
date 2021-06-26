import { Rule } from "eslint";
import { ImportDeclaration } from "estree";

const rule = {
  meta: {
    messages: {
      noReactImport: "Do not import React, use import deconstruction instead"
    }
  },
  create(context: Rule.RuleContext) {
    return {
      ImportDeclaration(node: ImportDeclaration) {
        node.specifiers?.forEach((item) => {
          if (item.local.name === "React") {
            return context.report({
              node,
              messageId: "noReactImport"
            });
          }
          return null;
        });
      }
    };
  }
};

export default rule;
