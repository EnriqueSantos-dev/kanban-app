import { create } from 'zustand';

type MenuStoreState = {
	isMenuOpen: boolean;
	actions: {
		setIsMenuOpen: (state?: boolean) => void;
	};
};

const MenuStore = create<MenuStoreState>((set) => ({
	isMenuOpen: true,
	actions: {
		setIsMenuOpen: (value) => set({ isMenuOpen: value })
	}
}));

export const useMenuStore = MenuStore;
export const useMenuActions = () => MenuStore.getState().actions;
