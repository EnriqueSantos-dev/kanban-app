import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { FormValues } from '~/pages/register/components/RegisterForm';

import { signup } from '~/services/auth.service';

import { ErrorApi } from '~/types';

import { useNotificationToasty } from './useNotificationToasty';

export const useSignUpMutation = () => {
	const { notification } = useNotificationToasty();
	const navigate = useNavigate();

	return useMutation<void, ErrorApi, FormValues>({
		mutationFn: (data) => signup(data),
		onSuccess: () => {
			notification('success', 'Register success, your are redirecting...');
			setTimeout(() => navigate('/auth/login'), 2000);
		},
		onError: (error) => {
			const errorMessage =
				error.response?.data?.message ?? 'Something went wrong';
			notification('error', errorMessage);
		}
	});
};
