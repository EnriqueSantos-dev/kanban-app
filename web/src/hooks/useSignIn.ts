import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ResponseSignIn, SignInRequest, signin } from '~/services/auth.service';
import { ErrorApi } from '~/types';
import { setAuthToken } from '~/utils/auth';
import { api } from '~/lib';
import { useNotificationToasty } from './useNotificationToasty';

export const useSignInMutation = ({
	callback
}: {
	callback: (...args: any) => void;
}) => {
	const navigate = useNavigate();
	const { notification } = useNotificationToasty();

	return useMutation<ResponseSignIn, ErrorApi, SignInRequest>({
		mutationFn: (data) => signin(data),
		onSuccess: (data) => {
			api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
			setAuthToken(data.access_token);
			callback(data.access_token);
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
