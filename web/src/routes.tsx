import { lazy,Suspense } from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route} from 'react-router-dom';

import { LoginPage, RegisterPage } from '~/pages';
import { loginLoader } from '~/pages/login';

import { LoadingPage } from '~/shared/components';
import { RequireAuth } from '~/shared/components/RequireAuth';

import { AuthLayout } from '~/shared/layouts';

import { App } from './App';

const HomePage = lazy(() => import('~/pages/home'));

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route
				index
				element={
					<RequireAuth>
						<Suspense fallback={<LoadingPage />}>
							<HomePage />
						</Suspense>
					</RequireAuth>
				}
			/>
			<Route path="auth" element={<AuthLayout />}>
				<Route path="login" element={<LoginPage />} loader={loginLoader} />
				<Route path="register" element={<RegisterPage />} />
			</Route>
		</Route>
	)
);
