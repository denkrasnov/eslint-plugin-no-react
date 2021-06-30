import rule from "../lib/rules/no-react-qualifier";
import { resolve } from "path";
import { TSESLint } from "@typescript-eslint/experimental-utils";

const ruleTester = new TSESLint.RuleTester({
  parser: resolve("./node_modules/@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  }
});

ruleTester.run("no-react-qualifier", rule, {
  valid: [
    {
      code: `const sm: Smthg.SFC = "";`
    }
  ],
  invalid: [
    {
      code: `
      declare global {
        var REACT: React;
     }
     window.React = REACT;
     const sm: React.SFC = "";`,
      errors: [{ messageId: "noReactQualifier" }]
    },
    {
      code: `
      declare global {
        var REACT: React;
     }
     window.React = REACT;
     const sm: Smthg.SFC = "";
     interface Smthg {
       callBack: (e: React.MouseEvent) => void
     }`,
      errors: [{ messageId: "noReactQualifier" }]
    }
  ]
});
