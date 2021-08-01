module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "jest", "cypress"],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jest/recommended",
    "plugin:jest/style",
    "plugin:cypress/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@next/next/recommended",
    "next/core-web-vitals",
    "prettier",
  ],
  rules: {
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "arrow-body-style": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
  },
};
