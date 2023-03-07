/* eslint-disable @typescript-eslint/naming-convention */
import { ToastOptions, toast } from 'react-toastify';

type NOTIFICATION_TYPES = 'success' | 'error';

const defaultOptions = {
	autoClose: 1000,
	delay: 0
} satisfies ToastOptions;

export function useNotificationToasty() {
	const notification = (
		notificationType: NOTIFICATION_TYPES,
		message: string,
		options?: ToastOptions
	) => toast[notificationType](message, options ?? defaultOptions);

	return notification;
}
