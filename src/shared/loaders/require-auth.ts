import { LoaderFunction, redirect } from 'react-router-dom';
import { verifyToken } from '~/services/auth.service';
import { getAuthToken, removeAuthToken } from '~/utils/auth';

export const requireAuth: LoaderFunction = async () => {
	const token = getAuthToken();
	if (!token) return redirect('/auth/login');

	console.log('token', token);

	try {
		await verifyToken();
	} catch (e) {
		removeAuthToken();
		return redirect('/auth/login');
	}

	return null;
};
