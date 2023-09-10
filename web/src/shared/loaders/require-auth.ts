import { defer, redirect } from 'react-router-dom';

import { verifyToken } from '~/services/auth.service';

import { getAuthToken, removeAuthToken } from '~/utils/auth';

export const requireAuth = async () => {
	const token = getAuthToken();
	if (!token) return redirect('/auth/login');

	return defer({
		isAuth: verifyToken(token)
			.then(() => true)
			.catch(() => removeAuthToken())
	});
};
