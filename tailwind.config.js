module.exports = {
	content: [
		'./components/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}'
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		// extend: {
		// 	colors: {
		// 		primary:     'var(--primary)',
		// 		secondary:   'var(--secondary)',
		// 		accent:      'var(--accent)',
		// 		'accent-hl': 'var(--accent-hl)'
		// 	}
		// }
	},
	variants: {
		extend: {}
	},
	plugins: [
		require('@tailwindcss/typography')
	]
};
