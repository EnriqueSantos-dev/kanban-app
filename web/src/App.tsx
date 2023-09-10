import { Outlet } from 'react-router-dom';

import { AppProviders } from '~/shared/components';

export function App() {
	return (
		<AppProviders>
			<Outlet />
		</AppProviders>
	);
}
