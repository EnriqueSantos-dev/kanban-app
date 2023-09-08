import { create } from 'zustand';
import { UserProfile } from '~/types';
import { getAuthToken } from '~/utils';

type AuthState = {
	user: UserProfile | undefined;
	token: string | undefined;
	isAuth: boolean;
	actions: {
		setToken: (token?: string) => void;
		setUser: (user: UserProfile) => void;
		clearAll: () => void;
		setIsAuth: (isAuth: boolean) => void;
	};
};

const AuthStore = create<AuthState>((set) => ({
	token: getAuthToken(),
	user: undefined,
	isAuth: false,
	actions: {
		setToken: (token?: string) => set({ token }),
		setUser: (user: UserProfile) => set({ user, isAuth: true }),
		clearAll: () => set({ user: undefined, token: undefined, isAuth: false }),
		setIsAuth: (isAuth: boolean) => set({ isAuth })
	}
}));

export const useAuthStore = AuthStore;
export const useAuthStoreActions = () => AuthStore.getState().actions;
