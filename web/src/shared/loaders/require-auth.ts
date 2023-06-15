import { LoaderFunction, redirect } from 'react-router-dom';
import { verifyToken } from '~/services/auth.service';
import { getAuthToken, removeAuthToken } from '~/utils/auth';

export const requireAuth: LoaderFunction = async () => {
	const token = getAuthToken();
	if (!token) return redirect('/auth/login');

	return verifyToken(token)
		.then(() => null)
		.catch(() => {
			removeAuthToken();
			return redirect('/auth/login');
		});
};
