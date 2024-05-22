module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:lodash/recommended",
    "plugin:import/recommended",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "postcss.config.js",
    "tailwind.config.js",
    "prettier.config.cjs",
    "scripts",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  plugins: ["react", "simple-import-sort", "import", "unused-imports", "react-refresh", "lodash", "only-warn"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    // https://www.npmjs.com/package/eslint-plugin-unused-imports#usage
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    "simple-import-sort/imports": [
      "warn",
      {
        groups: [["^\\u0000"], ["^node:"], ["react", "^@?\\w"], ["^"], ["^\\."]],
      },
    ],
    "simple-import-sort/exports": "warn",

    "no-console": ["warn", { allow: ["warn", "error"] }],
    "padding-line-between-statements": ["warn", { blankLine: "always", prev: "*", next: "return" }],

    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],

    "import/no-unresolved": "off",
    "import/named": "off",
    "lodash/prefer-lodash-method": "off",
    "lodash/prefer-matches": "off",
    "@typescript-eslint/no-explicit-any": "off",

    "react/no-unused-prop-types": "warn",
    "@typescript-eslint/no-misused-promises": "off",
    "react/jsx-key": "warn",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/unbound-method": "off",
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/await-thenable": "off",
    "@typescript-eslint/ban-ts-comment": "off",

    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
  },
};
