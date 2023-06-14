import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	useGetProfileQuery,
	useSignInMutation,
	useSignUpMutation
} from '~/hooks';
import { logoutUser } from '~/services/auth.service';
import { useActiveBoardStore } from '~/stores/active-board-store';
import { useAuthStore, useAuthStoreActions } from '~/stores/auth-store';
import { UserProfile } from '~/types';
import { getAuthToken, removeAuthToken } from '~/utils/auth';

export function useAuthContext() {
	const navigate = useNavigate();
	const { activeBoard, setActiveBoard } = useActiveBoardStore();
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
		logoutUser();
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

	useEffect(() => {
		const tokenInLocalStorage = getAuthToken();

		if (tokenInLocalStorage) {
			setToken(tokenInLocalStorage);
		} else {
			setToken(undefined);
		}
	}, []);

	return {
		signinMutation,
		signupMutation,
		logout,
		isLoading: getProfileQuery.isLoading
	};
}
