/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				error: 'orangered',
			},
			scale: {
				101: '1.01',
			},
			transitionProperty: {
				'max-height': 'max-height',
			},
		},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('daisyui')],

	daisyui: {
		styled: true,
		themes: ['bumblebee', 'halloween'],
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: '',
		darkTheme: 'halloween',
	},
};
