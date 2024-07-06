import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import parser from "@typescript-eslint/parser"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import { fixupConfigRules } from "@eslint/compat"
import eslintPluginReact from "eslint-plugin-react"
import eslintPluginReactRefresh from "eslint-plugin-react-refresh"

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
	},
	{
		plugins: {
			eslintPluginReact,
		},
		rules: {
			"react/jsx-uses-vars": "error",
			"react/no-array-index-key": "warn",
			"react/function-component-definition": [
				2,
				{
					namedComponents: "arrow-function",
				},
			],
			"react/jsx-uses-react": "off",
			"react/react-in-jsx-scope": "off",
		},
	},
	{
		plugins: {
			"react-refresh": eslintPluginReactRefresh,
		},
		rules: {
			"react-refresh/only-export-components": [
				"warn",
				{
					allowConstantExport: true,
				},
			],
		},
	},
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
	{
		ignores: ["**/build/", "**/node_modules/", "**/dist/"],
	},
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
					code: 100,
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
	}),
]
