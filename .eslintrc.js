module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb",
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier",
  ],
  ignorePatterns: ["coverage"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "after-used",
        vars: "all",
        caughtErrors: "none",
        ignoreRestSiblings: true,
      },
    ],
    "prettier/prettier": "error",
    "@typescript-eslint/unbound-method": "off",
    "operator-linebreak": [
      "error",
      "after",
      { overrides: { "?": "before", ":": "before" } },
    ],
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
  settings: {
    jsdoc: {
      tagNamePreference: {
        returns: "return",
      },
    },
  },
};
