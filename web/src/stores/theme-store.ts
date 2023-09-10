import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Theme } from '~/types';

import { THEME_KEY_LOCAL_STORAGE } from '~/constants/theme';

type ThemeState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

export const useThemeStore = create(
	persist<ThemeState>(
		(set) => ({
			theme: 'light',
			setTheme: (theme: Theme) => set({ theme })
		}),
		{
			name: THEME_KEY_LOCAL_STORAGE
		}
	)
);
