module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function" }
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variableLike",
        format: ["camelCase"]
      }
    ],
    "import/no-default-export": "error"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
