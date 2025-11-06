import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      "build/**",
      "dist/**",
      "*.config.js",
      "*.config.mjs",
      "**/*.mdx",
      "**/*.d.ts",
    ],
  },
  js.configs.recommended,
  ...compat.extends(
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ),
  ...compat.extends("plugin:jsx-a11y/recommended"),
  ...compat.extends("prettier"),
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        self: "readonly",
        console: "readonly",
        URLSearchParams: "readonly",
        dataLayer: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React 17+ doesn't require React in scope
      "react/react-in-jsx-scope": "off",
      // Disable prop-types validation (can be enabled if needed)
      "react/prop-types": "off",
    },
  },
  // Config files (like babel.config.js) use CommonJS
  {
    files: ["*.config.js", "*.config.mjs"],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
      },
      sourceType: "commonjs",
    },
  },
  // CommonJS files in plugin/ and root level
  {
    files: ["plugin/**/*.js", "preprocesscodeblocks.js", "sidebars.js"],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
      },
      sourceType: "commonjs",
    },
  },
  // TypeScript files (if TypeScript is installed, otherwise just ignore .d.ts)
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  // Static JS files (browser environment)
  {
    files: ["static/js/**/*.js"],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        self: "readonly",
        console: "readonly",
        URLSearchParams: "readonly",
        dataLayer: "readonly",
        ip2c: "readonly",
        m: "readonly",
      },
      sourceType: "script",
    },
  },
];

export default eslintConfig;
