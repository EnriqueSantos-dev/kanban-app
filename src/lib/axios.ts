/* eslint-disable no-param-reassign */
import axios, { AxiosRequestConfig } from 'axios';
import jwtDecode from 'jwt-decode';
import { JwtPayloadType } from '~/types';
import { getAuthToken, setAuthToken } from '~/utils/auth';
import { refreshToken } from '~/services/auth.service';

const BASE_URL = 'http://localhost:3333/api/v1';

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
