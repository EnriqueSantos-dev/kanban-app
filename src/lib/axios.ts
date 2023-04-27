/* eslint-disable no-param-reassign */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
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
api.interceptors.request.use(async (config) => {
	const pathname = config.url ?? '';
	const token = getAuthToken();
	config.headers.Authorization = `Bearer ${token}`;

	if (token) {
		const decodedToken = jwtDecode<JwtPayloadType>(token);
		const currentTime = Date.now() / 1000;

		if (
			decodedToken.exp &&
			decodedToken.exp < currentTime &&
			!pathnamesMatches.includes(pathname)
		) {
			const { access_token: accessToken } = await refreshToken();
			setAuthToken(accessToken);
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
	}

	return config;
}, undefined);

// interceptor response and add custom error message if needed
api.interceptors.response.use(
	(response) => response,
	(error: AxiosError<any>) => {
		const newResponse = { ...error };

		if (!error.response?.data.message) {
			newResponse.message = 'something went wrong, please try again later.';
		}

		newResponse.message = error.response?.data.message ?? newResponse.message;

		error.message = newResponse.message;

		return Promise.reject(error);
	}
);
