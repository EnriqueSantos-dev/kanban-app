import { ToastOptions, TypeOptions, toast } from 'react-toastify';

const defaultOptions = {
	autoClose: 500,
	delay: 0,
	type: 'success'
} satisfies ToastOptions;

export function useNotificationToasty() {
	const notification = (
		notificationType: TypeOptions,
		message: string,
		options?: ToastOptions
	) => toast(message, { ...options, type: notificationType } ?? defaultOptions);

	return notification;
}
