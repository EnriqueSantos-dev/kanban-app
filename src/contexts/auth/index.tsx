import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useNotificationToasty } from '~/hooks';
import {
	ResponseSignIn,
	SignInRequest,
	getProfile,
	logoutUser,
	signin,
	signup
} from '~/services/auth.service';
import { ErrorApi } from '~/types';
import { removeAuthToken, setAuthToken } from '~/utils/auth';
import { FormValues } from '~/pages/register/components/RegisterForm';
import { useAuthStore, useAuthStoreActions } from '~/stores/auth-store';

export function useAuthContext() {
	const { token, user } = useAuthStore();
	const { setUser, setToken, clearAll } = useAuthStoreActions();
	const [isLoading, setIsLoading] = useState(false);
	const notification = useNotificationToasty();
	const navigate = useNavigate();

	const signinMutation = useMutation<ResponseSignIn, ErrorApi, SignInRequest>({
		mutationFn: (data) => signin(data),
		onSuccess: (data) => {
			setAuthToken(data.access_token);
			setToken(data.access_token);
			notification('success', 'login success, your are redirecting...');
			setTimeout(() => navigate('/'), 2000);
		},
		onError: (error) => {
			const errorMessage =
				error.response?.data?.message ?? 'Something went wrong';
			notification('error', errorMessage);
		}
	});

	const signupMutation = useMutation<void, ErrorApi, FormValues>({
		mutationFn: (data) => signup(data),
		onSuccess: () => {
			notification('success', 'Register success, your are redirecting...');
			setTimeout(() => navigate('/login'), 2000);
		},
		onError: (error) => {
			const errorMessage =
				error.response?.data?.message ?? 'Something went wrong';
			notification('error', errorMessage);
		}
	});

	const logout = useCallback(async (userId: string) => {
		removeAuthToken();
		clearAll();
		navigate('/login');
		await logoutUser(userId);
	}, []);

	useEffect(() => {
		if (token) {
			setIsLoading(true);
			getProfile()
				.then((data) => setUser(data))
				.catch(async () => {
					navigate('/login');
					if (user) await logout(user.id);
				})
				.finally(() => setIsLoading(false));
		}
	}, [token]);

	return { user, signinMutation, signupMutation, logout, isLoading };
}
