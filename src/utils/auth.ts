import { AUTH_TOKEN_KEY } from '@/constants/auth.constants';

export const getAuthToken = () =>
	localStorage.getItem(AUTH_TOKEN_KEY) ?? undefined;

export const setAuthToken = (token: string) =>
	localStorage.setItem(AUTH_TOKEN_KEY, token);

export const removeAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);
