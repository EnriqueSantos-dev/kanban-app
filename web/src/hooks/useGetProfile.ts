import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getProfile } from '~/services/auth.service';
import { ErrorApi, UserProfile } from '~/types';
import { userKeys } from '~/utils';

type QueryData = {
	token?: string;
	callback: (...args: any) => void;
};

export const useGetProfileQuery = ({ token, callback }: QueryData) => {
	const query = useQuery<UserProfile, ErrorApi>({
		queryKey: userKeys.profile,
		queryFn: getProfile,
		enabled: Boolean(token),
		retry: false
	});

	useEffect(() => {
		if (query.data) callback(query.data);
	}, [query.data]);

	return query;
};
