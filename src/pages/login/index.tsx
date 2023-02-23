import { Link } from 'react-router-dom';
import { FormLogin } from './components/FormLogin';

export function LoginPage() {
	return (
		<>
			<h1 className="text-mediumGrey mt-2 text-2xl font-bold">Login</h1>
			<FormLogin />
			<div className="mt-2 flex w-full items-center gap-2 text-sm">
				<p className="text-mediumGrey">No have account?</p>
				<Link to="/register" className="font-medium text-blue-400 underline">
					Register
				</Link>
			</div>
		</>
	);
}
