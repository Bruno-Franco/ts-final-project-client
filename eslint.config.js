import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		// extends: [js.configs.recommended, ...tseslint.configs.recommended],

		// added by schedule chat gpt
		extends: [
			js.configs.recommended, // Configuração básica do JavaScript
			...tseslint.configs['strict-type-checked'], // Substituído para "strict-type-checked"
			'plugin:@typescript-eslint/stylistic-type-checked', // Opcional: estilo baseado em tipo
			'plugin:react/recommended', // Configuração recomendada para React
			'plugin:react/jsx-runtime', // Suporte ao novo JSX transform do React
		],
		// ////////////////////////
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			//// added by schedule chat gpt
			// Regras adicionais, se necessário:
			'react/react-in-jsx-scope': 'off', // Desativado para o novo JSX transform
			// ///////////////////////////
		},
		// added by schedule chat gpt
		// added by schedulex
		parser: '@typescript-eslint/parser',
		parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			project: ['./tsconfig.json', './tsconfig.node.json'],
			tsconfigRootDir: __dirname,
		},
	}
)
