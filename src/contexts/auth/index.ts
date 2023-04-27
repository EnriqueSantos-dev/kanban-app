import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	useActiveBoard,
	useGetProfileQuery,
	useSignInMutation,
	useSignUpMutation
} from '~/hooks';
import { logoutUser } from '~/services/auth.service';
import { useAuthStore, useAuthStoreActions } from '~/stores/auth-store';
import { UserProfile } from '~/types';
import { removeAuthToken } from '~/utils/auth';

export function useAuthContext() {
	const navigate = useNavigate();
	const { activeBoard, setActiveBoard } = useActiveBoard();
	const { token, user } = useAuthStore();
	const { setUser, setToken, clearAll } = useAuthStoreActions();

	const setTokenCallback = useCallback(
		(tokenValue: string) => {
			setToken(tokenValue);
		},
		[token]
	);

	const setUserCallback = useCallback(
		(data: UserProfile) => {
			setUser(data);
		},
		[user]
	);

	const signinMutation = useSignInMutation({ callback: setTokenCallback });
	const signupMutation = useSignUpMutation();
	const getProfileQuery = useGetProfileQuery({
		token,
		callback: setUserCallback
	});

	const logout = useCallback(async () => {
		removeAuthToken();
		clearAll();
		navigate('/auth/login');
		await logoutUser();
	}, []);

	useEffect(() => {
		if (activeBoard && user) {
			const existingBoard = user?.boards.find(
				(board) => board.id === activeBoard.id
			);

			if (!existingBoard) {
				setActiveBoard(undefined);
			}
		}
	}, [user]);

	return {
		signinMutation,
		signupMutation,
		logout,
		isLoading: getProfileQuery.isLoading
	};
}
