module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
     
    ],
    
    parserOptions: {
      ecmaVersion: 6, // Allows for the parsing of modern ECMAScript features
      sourceType: "module" // Allows for the use of imports
    },
    plugins: ["prettier"],
    rules: {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      // e.g. "@typescript-eslint/explicit-function-return-type": "off",
      "prettier/prettier": "error"
    }
  };