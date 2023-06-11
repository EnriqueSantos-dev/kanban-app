/* eslint-disable no-param-reassign */
import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from 'axios';
import jwtDecode from 'jwt-decode';
import { refreshToken } from '~/services/auth.service';
import { JwtPayloadType } from '~/types';
import { getAuthToken, setAuthToken } from '~/utils/auth';

const BASE_URL = import.meta.env.VITE_API_URL;

const commonOptions: AxiosRequestConfig = {
	baseURL: BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
};

// create two instances of axios to avoid infinite loop
export const api = axios.create(commonOptions);
export const axiosRefreshTokenInstance = axios.create(commonOptions);

const pathnamesMatches = ['/auth/refresh', '/auth/logout', '/auth/login'];

// interceptor request
api.interceptors.request.use(async (config: any) => {
	const pathname = config.url ?? '';
	const token = getAuthToken();
	config.headers.Authorization = `Bearer ${token}`;

	if (token) {
		const decodedToken = jwtDecode<JwtPayloadType>(token);
		const currentTime = Date.now() / 1000;

		if (
			decodedToken.exp &&
			decodedToken.exp < currentTime &&
			!pathnamesMatches.includes(pathname) &&
			!config.isRetry
		) {
			config.isRetry = true;
			const { access_token: accessToken } = await refreshToken().catch(() =>
				Promise.reject(
					new Error('REFRESH_TOKEN_ERROR', { cause: 'REFRESH_TOKEN_ERROR' })
				)
			);
			setAuthToken(accessToken);
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
	}

	return config;
}, undefined);

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
