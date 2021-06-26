import { RuleTester } from "eslint";
import rule from "../lib/rules/no-react-import";

// @ts-ignore
RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  }
});

const ruleTester = new RuleTester();

ruleTester.run("no-react-import", rule, {
  valid: [
    {
      code: `
  import { useState } from 'react';
  import { imports, andAlsoLongImportsThatTakesSpace } from './another_module';
  import * as snthg from 'react';
  import ReactDOM from 'react-dom';
  import 'someFile.scss';
  const some = React;s
  `
    }
  ],
  invalid: [
    {
      code: `import React from 'react'`,
      errors: [{ messageId: "noReactImport" }]
    },
    {
      code: `import * as React from 'react'`,
      errors: [{ messageId: "noReactImport" }]
    }
  ]
});
