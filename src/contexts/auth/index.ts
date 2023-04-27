import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	useGetProfileQuery,
	useSignInMutation,
	useSignUpMutation
} from '~/hooks';
import { logoutUser } from '~/services/auth.service';
import { useAuthStore, useAuthStoreActions } from '~/stores/auth-store';
import { UserProfile } from '~/types';
import { removeAuthToken } from '~/utils/auth';

export function useAuthContext() {
	const navigate = useNavigate();
	const { token, user } = useAuthStore();
	const { setUser, setToken, clearAll } = useAuthStoreActions();

	const setTokenCallback = useCallback(
		(tokenValue: string) => {
			setToken(tokenValue);
		},
		[token]
	);

	const setUserCallback = useCallback(
		(data: UserProfile) => {
			setUser(data);
		},
		[user]
	);

	const signinMutation = useSignInMutation({ callback: setTokenCallback });
	const signupMutation = useSignUpMutation();
	const getProfileQuery = useGetProfileQuery({
		token,
		callback: setUserCallback
	});

	const logout = useCallback(async () => {
		removeAuthToken();
		clearAll();
		navigate('/auth/login');
		await logoutUser();
	}, []);

	return {
		signinMutation,
		signupMutation,
		logout,
		isLoading: getProfileQuery.isLoading
	};
}
