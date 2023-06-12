/* eslint-disable no-param-reassign */
import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from 'axios';
import { getAuthToken } from '~/utils';

const BASE_URL = import.meta.env.VITE_API_URL;

const commonOptions: AxiosRequestConfig = {
	baseURL: BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
};

export const api = axios.create(commonOptions);

api.interceptors.request.use((config)  => {
	const token = getAuthToken()

	if (token) {
		api.defaults.headers.common.Authorization = `Bearer ${token}`
	}

	return config
}, undefined)

export const DEFAULT_ERROR_MESSAGES = {
	somethingMessage: '🫤 Ops! Something went wrong, please try again later.',
	networkError: '📡 Network error, please try again later.',
	unauthorizedMessage: '🔐 Unauthorized, please login again.'
} as const;

const mappedErrors = {
	500: DEFAULT_ERROR_MESSAGES.somethingMessage,
	401: DEFAULT_ERROR_MESSAGES.unauthorizedMessage
};

// interceptor response and add custom error message if needed
api.interceptors.response.use(
	(response) => response,
	(error: AxiosError<any>) => {
		const newResponse = { ...error };

		if (isAxiosError(error)) {
			if (error.code === AxiosError.ERR_NETWORK) {
				newResponse.message = DEFAULT_ERROR_MESSAGES.networkError;
				return Promise.reject(newResponse);
			}

			if (error.response && !error.response.data.message) {
				newResponse.message = DEFAULT_ERROR_MESSAGES.somethingMessage;
				return Promise.reject(newResponse);
			}

			if (error.response?.status && error.response.status in mappedErrors) {
				newResponse.message =
					mappedErrors[error.response?.status as keyof typeof mappedErrors];
				return Promise.reject(newResponse);
			}

			newResponse.message = error.response?.data.message ?? newResponse.message;
			return Promise.reject(newResponse);
		}

		return Promise.reject(error);
	}
);
