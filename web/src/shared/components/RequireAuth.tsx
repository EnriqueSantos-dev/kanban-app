import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useGetProfileQuery } from '~/hooks';

import { LoadingPage } from '~/shared/components/LoadingPage';

import { useAuthStore } from '~/stores/auth-store';

export function RequireAuth({ children }: { children: ReactNode }) {
	const query = useGetProfileQuery();
	const { isAuth, token } = useAuthStore();

	if (!token) {
		return <Navigate to="/auth/login" />;
	}

	if (query.isLoading) {
		return <LoadingPage />;
	}

	if (!isAuth || query.isError) {
		return <Navigate to="/auth/login" />;
	}

	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{children}</>;
}
