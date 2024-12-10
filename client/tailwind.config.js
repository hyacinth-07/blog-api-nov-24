/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			brown: {
				50: '#F6F6F3',
				100: '#EEECE7',
				200: '#DAD7CD',
				300: '#C9C4B5',
				400: '#B8B19E',
				500: '#A59D84',
				600: '#8A8165',
				700: '#67604B',
				800: '#443F32',
				900: '#23211A',
				950: '#12100D',
			},
		},
		extend: {
			fontFamily: {
				openSans: ['Open Sans'],
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
