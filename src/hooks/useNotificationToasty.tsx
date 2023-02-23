/* eslint-disable @typescript-eslint/naming-convention */
import { ToastOptions, toast } from 'react-toastify';

type NOTIFICATION_TYPES = 'success' | 'error';

export function useNotificationToasty() {
	const notification = (
		notificationType: NOTIFICATION_TYPES,
		message: string,
		options?: ToastOptions
	) => toast[notificationType](message, options);

	return notification;
}
