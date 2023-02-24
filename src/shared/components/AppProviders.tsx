import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { AuthContextProvider } from '@/contexts/auth';
import { queryClient } from '@/lib';
import { QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ToastContainer />
			<AuthContextProvider>{children}</AuthContextProvider>
		</QueryClientProvider>
	);
}
