import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import parser from "@typescript-eslint/parser"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import { fixupConfigRules } from "@eslint/compat"
import eslintPluginReact from "eslint-plugin-react"
import eslintPluginReactRefresh from "eslint-plugin-react-refresh"
import tailwind from "eslint-plugin-tailwindcss"

export default [
	// Specify the file extensions to lint
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
	},

	// Directories to ignore during linting
	{
		ignores: ["**/build/", "**/node_modules/", "**/dist/"],
	},

	// Configure the import resolver for specific extensions
	{
		settings: {
			"import/resolver": {
				node: {
					extensions: [".js", ".jsx", ".ts", ".tsx"],
				},
			},
		},
	},

	// Configure React plugin and related rules
	{
		plugins: {
			eslintPluginReact,
		},
		rules: {
			"react/jsx-uses-vars": "error",
			"react/no-array-index-key": "warn",
			"react/function-component-definition": [
				"warn",
				{
					namedComponents: "arrow-function",
				},
			],
		},
	},

	// Configure React Refresh plugin and related rules
	{
		plugins: {
			"react-refresh": eslintPluginReactRefresh,
		},
		rules: {
			"react-refresh/only-export-components": "warn",
		},
		ignores: ["**/src/components/shadcn/**/*"],
	},

	// Configure language options and parser settings
	{
		languageOptions: {
			parser,
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				jsxPragma: null,
			},
		},
	},

	// Define general code style rules
	{
		rules: {
			"no-restricted-imports": [
				"error",
				{
					patterns: [
						{
							group: ["../*", "./"],
							message: "Please use the @/ alias instead of relative paths.",
						},
					],
				},
			],
			"no-nested-ternary": "off",
			"max-len": [
				"error",
				{
					code: 110,
					ignoreUrls: true,
					ignoreStrings: true,
					ignoreTemplateLiterals: true,
					ignoreRegExpLiterals: true,
				},
			],
			quotes: [
				"error",
				"double",
				{
					avoidEscape: true,
				},
			],
			indent: ["error", "tab"],
			semi: ["error", "never"],
			"linebreak-style": ["error", "unix"],
		},
	},

	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...fixupConfigRules({
		...pluginReactConfig,
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			"react/jsx-uses-react": "off",
			"react/react-in-jsx-scope": "off",
		},
	}),
	...tailwind.configs["flat/recommended"],
]
