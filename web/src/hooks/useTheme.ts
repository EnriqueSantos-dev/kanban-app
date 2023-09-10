import { useEffect } from 'react';

import { useThemeStore } from '~/stores/theme-store';

export function useTheme() {
	const { theme, setTheme } = useThemeStore();

	function changeThemeInHtml() {
		const html = document.documentElement;

		if (theme === 'light') {
			html.classList?.remove('dark');
			html.classList.add('light');
		} else {
			html.classList?.remove('light');
			html.classList.add('dark');
		}
	}

	useEffect(() => {
		const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

		const updateThemeBasedOnPreferences = () => {
			const match = mediaQueryList.matches;

			if (match && !theme) {
				setTheme('dark');
			}
		};

		mediaQueryList.addEventListener('change', updateThemeBasedOnPreferences);

		return () =>
			mediaQueryList.removeEventListener(
				'change',
				updateThemeBasedOnPreferences
			);
	}, []);

	useEffect(() => changeThemeInHtml(), [theme]);

	return { theme, setTheme };
}
