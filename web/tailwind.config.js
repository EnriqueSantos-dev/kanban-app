/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.tsx', 'index.html'],
	darkMode: ['class'],
	theme: {
		extend: {
			container: {
				center: true
			},
			fontSize: {
				'2xs': '14px'
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
				redHover: '#FF9898',
				skeleton: 'hsl(var(--skeleton-color))'
			},
			height: {
				mainHeight: 'calc(100vh - 5rem)'
			},
			maxHeight: {
				maxSidebarHeight: 'calc(100vh - 14.75rem)'
			},
			animation: {
				'fade-in': 'fade-in 100ms linear',
				'fade-out': 'fade-out 100ms ease-in-out',
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
				}
			},
			boxShadow: {
				taskCard: '0px 4px 6px rgba(54, 78, 126, 0.1)'
			}
		}
	},
	plugins: [
		require('tailwind-scrollbar')({ nocompatible: true }),
		require('tailwindcss-animate'),
		require('tailwind-scrollbar-hide')
	]
};
