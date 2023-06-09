import { LoaderFunction, redirect } from 'react-router-dom';
import { logoutUser, verifyToken } from '~/services/auth.service';
import { getAuthToken, removeAuthToken } from '~/utils/auth';

export const requireAuth: LoaderFunction = async () => {
	const token = getAuthToken();
	if (!token) return redirect('/auth/login');

	try {
		await verifyToken();
	} catch (e) {
		await logoutUser();
		removeAuthToken();
		return redirect('/auth/login');
	}

	return null;
};
