import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getProfile } from '~/services/auth.service';
import { useAuthStoreActions } from '~/stores/auth-store';

import { ErrorApi, UserProfile } from '~/types';

import { userKeys } from '~/utils';

export const useGetProfileQuery = () => {
	const { setUser } = useAuthStoreActions();
	const query = useQuery<UserProfile, ErrorApi>({
		queryKey: userKeys.profile,
		queryFn: getProfile,
		refetchOnWindowFocus: false
	});

	useEffect(() => {
		if (query.data) {
			setUser(query.data);
		}
	}, [query.data]);

	return query;
};
