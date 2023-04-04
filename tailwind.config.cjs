/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.tsx', 'index.html'],
	darkMode: ['class'],
	theme: {
		extend: {
			container: {
				center: true
			},
			colors: {
				purple: '#635FC7',
				purpleHover: '#A8A4FF',
				black: '#000112',
				veryDarkGrey: '#20212C',
				darkGrey: '#2B2C37',
				linesDark: '#3E3F4E',
				mediumGrey: '#828FA3',
				linesLight: '#E4EBFA',
				lightGrey: '#F4F7FD',
				white: '#fff',
				red: '#EA5555',
				redHover: '#FF9898'
			},
			height: {
				mainHeight: 'calc(100vh - 5rem)'
			},
			maxHeight: {
				maxSidebarHeight: 'calc(100vh - 14.75rem)'
			},
			animation: {
				'fade-in': 'fade-in 100ms linear forwards',
				'fade-out': 'fade-out 100ms ease-in-out forwards',
				'scale-up': 'scale 100ms ease-in-out forwards',
				'scale-down': 'scale 150ms ease-in-out backwards'
			},
			keyframes: {
				'fade-in': {
					from: { opacity: 0, visibility: 0 },
					to: { opacity: 1, visibility: 1 }
				},
				'fade-out': {
					from: { opacity: 1 },
					to: { opacity: 0 }
				},
				scale: {
					from: { scale: 0 },
					to: { scale: 100 }
				},
				'modal-translate-center': {
					to: { transform: 'translate(-50%, -50%) scale(1)' }
				}
			}
		}
	},
	plugins: [require('tailwind-scrollbar')({ nocompatible: true })]
};
