import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	redirect
} from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage } from '@/pages';
import { AuthLayout } from '@/shared/layouts';
import { toast } from 'react-toastify';
import { getProfile } from '@/services/auth.service';
import { getAuthToken, removeAuthToken } from './utils/auth';
import App from './App';

const loaderPrivateRoutes = async () => {
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
};

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<App />}>
			<Route
				path="/"
				index
				element={<HomePage />}
				loader={loaderPrivateRoutes}
			/>
			<Route element={<AuthLayout />}>
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />
			</Route>
		</Route>
	)
);
