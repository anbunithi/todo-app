module.exports = {
    root: true,
    overrides: [
      {
        files: ["*.ts"],
        parserOptions: {
          project: ["tsconfig.json"],
          createDefaultProgram: true
        },
        extends: [
          "plugin:@typescript-eslint/recommended",
          "plugin:@typescript-eslint/recommended-requiring-type-checking"
        ],
        rules: {
          "@typescript-eslint/no-explicit-any": "error",
          "@typescript-eslint/explicit-function-return-type": "warn",
          "@typescript-eslint/no-unused-vars": "error"
        }
      }
    ]
  };