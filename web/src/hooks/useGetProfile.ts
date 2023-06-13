import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_ERROR_MESSAGES } from '~/lib';
import { getProfile } from '~/services/auth.service';
import { ErrorApi, UserProfile } from '~/types';
import { userKeys } from '~/utils';

type QueryData = {
	token?: string;
	callback: (...args: any) => void;
};

export const useGetProfileQuery = ({ token, callback }: QueryData) => {
	const navigate = useNavigate();
	const query = useQuery<UserProfile, ErrorApi>({
		queryKey: userKeys.profile,
		queryFn: getProfile,
		enabled: Boolean(token),
		retry: false
	});

	useEffect(() => {
		if (query.error && query.error.response?.status === 401) {
			const toastId = crypto.randomUUID();
			toast.remove(toastId);
			toast.error(DEFAULT_ERROR_MESSAGES.unauthorizedMessage, {
				id: toastId
			});

			navigate('/auth/login');
		}
	}, [query.error]);

	useEffect(() => {
		if (query.data) callback(query.data);
	}, [query.data]);

	return query;
};
