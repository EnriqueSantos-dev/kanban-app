import { ReactNode, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { LoadingPage } from '~/shared/components/LoadingPage';

import { useGetProfile } from '~/hooks';

import { getAuthToken } from '~/utils';

export function RequireAuth({ children }: { children: ReactNode }) {
	const [token] = useState(() => getAuthToken());
	const { isLoading, error } = useGetProfile(token);

	if (!token || error) {
		return <Navigate to="/auth/login" />;
	}

	if (isLoading && !error) {
		return <LoadingPage />;
	}

	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{children}</>;
}
