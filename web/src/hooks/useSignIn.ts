import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ResponseSignIn, SignInRequest, signin } from '~/services/auth.service';
import { ErrorApi } from '~/types';
import { setAuthToken } from '~/utils/auth';
import { api } from '~/lib';
import { useAuthStoreActions } from '~/stores/auth-store';
import { useNotificationToasty } from './useNotificationToasty';

export const useSignInMutation = () => {
	const navigate = useNavigate();

	const { notification } = useNotificationToasty();
	const { setToken } = useAuthStoreActions();

	return useMutation<ResponseSignIn, ErrorApi, SignInRequest>({
		mutationFn: (data) => signin(data),
		onSuccess: (data) => {
			api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
			setAuthToken(data.access_token);
			setToken(data.access_token);
			notification('success', 'login success, your are redirecting...', {
				duration: 1000
			});
			navigate('/');
		},
		onError: (error) => {
			const errorMessage =
				error.response?.data?.message ?? 'Something went wrong';
			notification('error', errorMessage);
		}
	});
};
