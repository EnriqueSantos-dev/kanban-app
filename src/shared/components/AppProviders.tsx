import 'react-toastify/dist/ReactToastify.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useTheme } from '~/hooks';
import { queryClient } from '~/lib';

interface AppProvidersProps {
	children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
	const { theme } = useTheme();

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen />
			<ToastContainer limit={1} theme={theme === 'dark' ? 'dark' : 'light'} />
			{children}
		</QueryClientProvider>
	);
}
