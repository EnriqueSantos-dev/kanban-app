import { api, axiosRefreshTokenInstance } from '@/lib';
import { FormValues } from '@/pages/register/components/RegisterForm';
import { UserProfile } from '@/types';

export async function getProfile(): Promise<UserProfile> {
	const response = await api.get('/auth/profile');
	return response.data;
}

export const signup = async (data: FormValues): Promise<void> => {
	const formData = new FormData();
	formData.append('name', data.name);
	formData.append('email', data.email);
	formData.append('password', data.password);
	if (data.avatar) formData.append('avatar', data.avatar);

	await api({
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

export const signin = async (
	email: string,
	password: string
): Promise<ResponseSignIn> => {
	const response = await api.post('/auth/login', { email, password });
	return response.data;
};

interface ResponseRefreshToken {
	accessToken: string;
}

export const refreshToken = (): Promise<ResponseRefreshToken> =>
	axiosRefreshTokenInstance.post('/auth/refresh').then((res) => res.data);
