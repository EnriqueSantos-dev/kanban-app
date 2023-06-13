import { Link, LoaderFunction, redirect } from 'react-router-dom';
import { getAuthToken } from '~/utils';
import { FormLogin } from './components/FormLogin';

export const loginLoader: LoaderFunction = async () => {
	const token = getAuthToken();
	return token ? redirect('/') : null;
};

export function LoginPage() {
	return (
		<>
			<h1 className="text-mediumGrey mt-2 text-2xl font-bold dark:text-white">
				Login
			</h1>
			<FormLogin />
			<div className="mt-2 flex w-full items-center gap-2 text-sm">
				<p className="text-mediumGrey dark:text-white">No have account?</p>
				<Link
					to="/auth/register"
					className="font-medium text-blue-400 underline"
				>
					Register
				</Link>
			</div>
		</>
	);
}
