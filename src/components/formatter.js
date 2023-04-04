import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

export const prettierConfig = {
  useTabs: false,
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: "all",
  jsxBracketSameLine: false,
  semi: false,
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: "auto",
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxSingleQuote: false,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  vueIndentScriptAndStyle: false,
};

export const getFormattedCodeBlock = (codeString) => {
  return prettier.format(codeString, {
    parser: "babel",
    plugins: [parserBabel],
    ...prettierConfig,
  });
};
