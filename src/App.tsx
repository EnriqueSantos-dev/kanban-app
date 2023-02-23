import 'react-toastify/dist/ReactToastify.css';
import '@/shared/styles/globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { queryClient } from './lib';
import { AuthContextProvider } from './contexts/auth/auth-context';

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastContainer />
			<AuthContextProvider>
				<Outlet />
			</AuthContextProvider>
		</QueryClientProvider>
	);
}
