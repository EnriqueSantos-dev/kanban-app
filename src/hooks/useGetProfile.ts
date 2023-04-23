import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '~/services/auth.service';
import { ErrorApi, UserProfile } from '~/types';
import { useEffect } from 'react';

type QueryData = {
	token?: string;
	callback: (...args: any) => void;
};

export const useGetProfileQuery = ({ token, callback }: QueryData) => {
	const navigate = useNavigate();

	const mutation = useQuery<UserProfile, ErrorApi, undefined, any>({
		queryKey: ['user/profile', { token }],
		queryFn: getProfile,
		enabled: !!token,
		refetchOnWindowFocus: false
	});

	useEffect(() => {
		if (mutation.error && !mutation.data) navigate('/auth/login');
		if (mutation.data) callback(mutation.data);
	}, [mutation.error, mutation.data]);

	return mutation;
};
