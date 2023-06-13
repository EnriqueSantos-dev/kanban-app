import { Link } from 'react-router-dom';
import { RegisterForm } from './components/RegisterForm';

export function RegisterPage() {
	return (
		<>
			<h1 className="text-mediumGrey mb-3 mt-2 text-2xl font-bold dark:text-white">
				Register
			</h1>
			<RegisterForm />
			<div className="mt-2 flex w-full items-center gap-2 text-sm">
				<p className="text-mediumGrey dark:text-white">You have account?</p>
				<Link to="/auth/login" className="font-medium text-blue-400 underline">
					Login
				</Link>
			</div>
		</>
	);
}
