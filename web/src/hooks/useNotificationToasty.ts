import {
	Renderable,
	toast,
	ToastOptions,
	ToastType,
	ValueOrFunction} from 'react-hot-toast';

import { ErrorApi } from '~/types';

import { useTheme } from './useTheme';

export function useNotificationToasty() {
	const { theme } = useTheme();
	const style = {
		backgroundColor: theme === 'dark' ? '#20212C' : '#fff',
		color: theme === 'dark' ? '#fff' : '#20212C'
	};

	const notification = (
		notificationType: Exclude<ToastType, 'blank'>,
		message: string,
		options?: ToastOptions
	) =>
		toast[notificationType](message, {
			...options,
			style
		});

	const notificationLoading = <T>(
		promise: Promise<T>,
		{
			loading,
			success,
			error
		}: {
			loading: Renderable;
			success: ValueOrFunction<Renderable, T>;
			error?: ValueOrFunction<Renderable, ErrorApi>;
		}
	): Promise<T> =>
		toast.promise(
			promise,
			{
				loading,
				success,
				error: error ?? 'Something went wrong'
			},
			{
				style
			}
		);

	return { notification, notificationLoading };
}
