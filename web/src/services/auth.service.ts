import { FormValues } from '~/pages/register/components/RegisterForm';

import { api } from '~/lib';

import { removeAuthToken } from '~/utils';

import { UserProfile } from '~/types';

export async function getProfile(): Promise<UserProfile> {
	const response = await api.get('/auth/profile', { timeout: 8000 });
	return response.data;
}

export const signup = async (data: FormValues): Promise<void> => {
	const formData = new FormData();
	formData.append('name', data.name);
	formData.append('email', data.email);
	formData.append('password', data.password);
	if (data.avatar) formData.append('avatar', data.avatar);

	return api({
		method: 'POST',
		url: '/auth/register',
		data: formData,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
};

export interface ResponseSignIn {
	access_token: string;
}

export interface SignInRequest {
	email: string;
	password: string;
}

export const signin = async ({
	email,
	password
}: SignInRequest): Promise<ResponseSignIn> => {
	const response = await api.post(
		'/auth/login',
		{ email, password },
		{ withCredentials: true }
	);
	return response.data;
};

interface ResponseRefreshToken {
	access_token: string;
}

export const refreshToken = (): Promise<ResponseRefreshToken> =>
	api.post('/auth/refresh').then((res) => res.data);

export const logoutUser = () => {
	removeAuthToken();
	window.location.reload();
};

export const verifyToken = (token?: string): Promise<void> =>
	api.post(
		'/auth/verify-token',
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
