import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { queryClient } from '~/lib';

interface AppProvidersProps {
	children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastContainer />
			{children}
		</QueryClientProvider>
	);
}
