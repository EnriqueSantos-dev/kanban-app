import {
	Route,
	createBrowserRouter,
	createRoutesFromElements
} from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage } from '~/pages';
import { AuthLayout } from '~/shared/layouts';
import { loaderPrivateRoutes } from '~/shared/loaders';
import { App } from './App';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<HomePage />} loader={loaderPrivateRoutes} />
			<Route element={<AuthLayout />}>
				<Route path="login" element={<LoginPage />} />
				<Route path="register" element={<RegisterPage />} />
			</Route>
		</Route>
	)
);
