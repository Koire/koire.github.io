/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
		},
		fontFamily: {
			sans: ["Graphik", "sans-serif"],
			serif: ["Merriweather", "serif"],
		},
		extend: {
			colors: {
				"blue": "#1fb6ff",
				"purple": "#7e5bef",
				"pink": "#ff49db",
				"orange": "#ff7849",
				"green": "#13ce66",
				"yellow": "#ffc82c",
				"gray-dark": "#273444",
				"gray": "#8492a6",
				"gray-light": "#d3dce6",
			},
			gridTemplateRows: {
				// Complex site-specific row configuration
				'layout': '80px auto',
			  }
		},
	},
	plugins: [],
}
