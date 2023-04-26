import { redirect } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { verifyToken } from '~/services/auth.service';
import { getAuthToken } from '~/utils/auth';

export async function requireAuth() {
	const token = getAuthToken();
	if (!token) return redirect('/auth/login');

	try {
		await verifyToken();
	} catch (_error) {
		toast.error('Your session has expired, please login again');
		return redirect('/auth/login');
	}

	return null;
}
