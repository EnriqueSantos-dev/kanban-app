import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProfile } from '~/services/auth.service';
import { getAuthToken } from '~/utils/auth';

export async function requireAuth() {
	const token = getAuthToken();
	if (!token) return redirect('/auth/login');

	await getProfile().catch(() => {
		toast.error('Your session has expired, please login again');
		return setTimeout(() => redirect('/auth/login'), 2000);
	});

	return null;
}
