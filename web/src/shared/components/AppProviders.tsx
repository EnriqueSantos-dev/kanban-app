import React from 'react';
import { Toaster } from 'react-hot-toast';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '~/lib';

interface AppProvidersProps {
	children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen />
			<Toaster
				position="top-right"
				toastOptions={{
					className: 'min-w-fit'
				}}
			/>
			{children}
		</QueryClientProvider>
	);
}
