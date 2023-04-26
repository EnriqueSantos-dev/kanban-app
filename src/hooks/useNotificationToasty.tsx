import { ToastOptions, toast } from 'react-hot-toast';
import { useTheme } from './useTheme';

export function useNotificationToasty() {
	const { theme } = useTheme();
	const notification = (
		notificationType: 'success' | 'error',
		message: string,
		options?: ToastOptions
	) =>
		toast[notificationType](message, {
			...options,
			style: {
				backgroundColor: theme === 'dark' ? '#20212C' : '#fff',
				color: theme === 'dark' ? '#fff' : '#20212C'
			}
		});

	return notification;
}
