import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AxiosError } from 'axios';

import { LoadingPage } from '~/shared/components/LoadingPage';

import { useGetProfile, useNotificationToasty } from '~/hooks';

import { getAuthToken } from '~/utils';

export function RequireAuth({ children }: { children: ReactNode }) {
	const { notification } = useNotificationToasty();
	const [token] = useState(() => getAuthToken());
	const { isLoading, error } = useGetProfile(token);

	useEffect(() => {
		if (
			error instanceof AxiosError &&
			error.message === 'GET_PROFILE_TIMEOUT'
		) {
			notification('error', 'O servidor demorou demais para responde 😢');
		}
	}, [error]);

	if (!token || error) {
		return <Navigate to="/auth/login" />;
	}

	if (isLoading && !error) {
		return <LoadingPage />;
	}

	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{children}</>;
}
