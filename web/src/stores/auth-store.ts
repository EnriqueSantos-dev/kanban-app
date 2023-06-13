import { create } from 'zustand';
import { UserProfile } from '~/types';

type AuthState = {
	user: UserProfile | undefined;
	token: string | undefined;
	actions: {
		setToken: (token?: string) => void;
		setUser: (user: UserProfile) => void;
		clearAll: () => void;
	};
};

const AuthStore = create<AuthState>((set) => ({
	token: undefined,
	user: undefined,

	actions: {
		setToken: (token?: string) => set({ token }),
		setUser: (user: UserProfile) => set({ user }),
		clearAll: () => set({ user: undefined, token: undefined })
	}
}));

export const useAuthStore = AuthStore;
export const useAuthStoreActions = () => AuthStore.getState().actions;
