/* eslint-disable @typescript-eslint/naming-convention */
import { ToastOptions, TypeOptions, toast } from 'react-toastify';

type NOTIFICATION_TYPES = TypeOptions;

const defaultOptions = {
	autoClose: 1000,
	delay: 0,
	type: 'success'
} satisfies ToastOptions;

export function useNotificationToasty() {
	const notification = (
		notificationType: NOTIFICATION_TYPES,
		message: string,
		options?: ToastOptions
	) => toast(message, { ...options, type: notificationType } ?? defaultOptions);

	return notification;
}
