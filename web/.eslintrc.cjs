/**@type {import("@types/eslint").ESLint.ConfigData} */
module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'airbnb-typescript',
		'prettier',
		'plugin:tailwindcss/recommended'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		project: './tsconfig.json'
	},
	ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts'],
	parser: '@typescript-eslint/parser',
	plugins: ['tailwindcss', 'simple-import-sort'],
	rules: {
		'simple-import-sort/exports': 'error',
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'tailwindcss/no-custom-classname': 'off',
		'tailwindcss/classnames-order': 'error',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/jsx-no-bind': 'off',
		'import/prefer-default-export': 'off',
		'jsx-a11y/label-has-associated-control': 'off',
		'react/jsx-no-useless-fragment': 'warn',
		'import/no-cycle': 'off',
		'react/require-default-props': 'off',
		'react/no-unused-prop-types': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
		],
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never'
			}
		],
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^react'],
					['^@?\\w'],
					['^~/pages'],
					['^~/shared/components'],
					['^~/stores'],
					['^~/hooks'],
					['^~/services'],
					['^~/lib'],
					['^~/utils'],
					['^~/types'],
					['^'],
					['^\\.'],
					['(\\w)?(\\.css|\\.scss)$']
				]
			}
		]
	},
	settings: {
		tailwindcss: {
			calles: ['cn', 'cva']
		},
		'import/resolver': {
			alias: {
				map: [['~', './src']],
				extensions: ['.tsx', '.ts', '.js', '.json']
			}
		}
	}
};
