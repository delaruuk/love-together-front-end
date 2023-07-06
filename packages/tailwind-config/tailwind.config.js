module.exports = {
	content: [
		"../../packages/ui/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				main: "#990066",
				"main-dark": "#8a005c",
				"main-light": "#a31a75",
				secondary: "#ff9900",
				"secondary-dark": "#e68a00",
				"secondary-light": "#ffa31a",
				"secondary-white": "#ffeaf8",
				"correct-green": "#0fa05d",
				"compatibility-great": "#3E8FED",
				"compatibility-good": "#B750D1",
				"compatibility-bad": "#4E4D84",
			},
			animation: {
				loader: "loader 0.6s infinite alternate",
			},
			keyframes: {
				loader: {
					to: {
						opacity: 0.1,
						transform: "translate3d(0, -1rem, 0)",
					},
				},
			},
			fontFamily: {
				kumbh: ['"Kumbh Sans"', "sans-serif"],
				mont: ["Montserrat", "sans-serif"],
			},
		},
	},
	plugins: [],
};
