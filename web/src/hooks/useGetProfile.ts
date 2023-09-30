import { useQuery } from '@tanstack/react-query';

import { useAuthStoreActions } from '~/stores/auth-store';

import { getProfile } from '~/services/auth.service';

import { userKeys } from '~/utils';

export function useGetProfile(token?: string) {
	const { setUser } = useAuthStoreActions();

	return useQuery(userKeys.profile, async () => getProfile(token), {
		onSuccess: (data) => {
			setUser(data);
		}
	});
}
