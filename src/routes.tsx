import { Suspense, lazy } from 'react';
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements
} from 'react-router-dom';
import { LoginPage, RegisterPage } from '~/pages';
import { loginLoader } from '~/pages/login';
import { AuthLayout } from '~/shared/layouts';
import { requireAuth } from '~/shared/loaders';
import { App } from './App';
import { LoadingPage } from './shared/components';

const HomePage = lazy(() => import('./pages/home'));

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route
				index
				element={
					<Suspense fallback={<LoadingPage />}>
						<HomePage />
					</Suspense>
				}
				loader={requireAuth}
			/>
			<Route path="auth" element={<AuthLayout />}>
				<Route path="/login" element={<LoginPage />} loader={loginLoader} />
				<Route path="/register" element={<RegisterPage />} />
			</Route>
		</Route>
	)
);
