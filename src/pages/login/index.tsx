import { Link, redirect } from 'react-router-dom';
import { verifyToken } from '~/services/auth.service';
import { FormLogin } from './components/FormLogin';

export const loginLoader = async () => {
	try {
		await verifyToken();
		return redirect('/');
	} catch (error) {
		return null;
	}
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
