import { Outlet } from 'react-router-dom';
import { AppProviders } from '~/shared/components';
import '~/shared/styles/globals.css';

export function App() {
	return (
		<AppProviders>
			<Outlet />
		</AppProviders>
	);
}
