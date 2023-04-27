import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';
import { logoutUser, verifyToken } from '~/services/auth.service';
import { getAuthToken, removeAuthToken } from '~/utils/auth';

export async function requireAuth() {
	const token = getAuthToken();
	if (!token) return redirect('/auth/login');

	try {
		await verifyToken();
	} catch (e) {
		toast.error('Your session has expired, please login again');
		await logoutUser().catch(() => {
			removeAuthToken();
		});
		return redirect('/auth/login');
	}

	return null;
}
