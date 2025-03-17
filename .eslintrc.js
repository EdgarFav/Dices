module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-inferrable-types": 0,
    "no-empty": 0,
    "no-mixed-spaces-and-tabs": 0,
    "react/jsx-key": 0,
    "@typescript-eslint/ban-types": 0,
    "@typescript-eslint/no-extra-semi": 0,
    "no-empty-pattern": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "no-prototype-builtins": 0,
    "@typescript-eslint/no-empty-function": 0,
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prefer-const": [
      0,
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-inferrable-types": [
      0,
      {
        ignoreParameters: true,
      },
    ],
  },
};
