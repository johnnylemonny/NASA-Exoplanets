import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";

const browserGlobals = {
  window: "readonly",
  document: "readonly",
  localStorage: "readonly",
  CustomEvent: "readonly",
  Event: "readonly"
};

const nodeGlobals = {
  console: "readonly",
  fetch: "readonly",
  process: "readonly"
};

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs["flat/recommended"],
  {
    ignores: ["dist/**", ".astro/**", "src/generated/**"]
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"]
      }
    }
  },
  {
    files: ["src/**/*.{ts,tsx,astro}"],
    languageOptions: {
      globals: browserGlobals
    },
    plugins: {
      "jsx-a11y": jsxA11y
    },
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ]
    }
  },
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      globals: nodeGlobals
    },
    rules: {
      "no-console": "off"
    }
  }
];
