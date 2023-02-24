import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProfile } from '@/services/auth.service';
import { getAuthToken, removeAuthToken } from '@/utils/auth';

export async function loaderPrivateRoutes() {
	const token = getAuthToken();
	if (!token) return redirect('/login');

	try {
		await getProfile();
	} catch (error) {
		toast.error('Your session has expired, please login again');
		removeAuthToken();
		setTimeout(() => redirect('/login'), 2000);
	}

	return null;
}
