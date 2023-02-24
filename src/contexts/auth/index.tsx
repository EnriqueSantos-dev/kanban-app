import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useReducer,
	useState
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ErrorApi, UserProfile } from '@/types';
import {
	ResponseSignIn,
	SignInRequest,
	getProfile,
	signin,
	signup
} from '@/services/auth.service';
import { getAuthToken, removeAuthToken, setAuthToken } from '@/utils/auth';
import { useNotificationToasty } from '@/hooks';
import { FormValues } from '@/pages/register/components/RegisterForm';
import { api } from '@/lib';

interface AuthContextData {
	data: {
		isAuthenticated: boolean;
		token: string | undefined;
		user: UserProfile | undefined;
	};
	setData: React.Dispatch<Partial<AuthContextData>>;
}

const initialState = {
	data: {
		isAuthenticated: false,
		token: getAuthToken(),
		user: undefined
	}
} satisfies Pick<AuthContextData, 'data'>;

const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({
	children
}: {
	children: React.ReactNode;
}) {
	const [{ data }, setData] = useReducer(
		(
			state: Pick<AuthContextData, 'data'>,
			newState: Partial<Pick<AuthContextData, 'data'>>
		) => ({ ...state, ...newState }),
		initialState
	);

	const values = useMemo(
		() => ({ data, setData }),
		[data.isAuthenticated, data.token, data.user]
	);

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
	const { data: globalData, setData: setGlobalData } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);
	const notification = useNotificationToasty();
	const navigate = useNavigate();
	const location = useLocation();

	const signinMutation = useMutation<ResponseSignIn, ErrorApi, SignInRequest>({
		mutationFn: (data) => signin(data),
		onSuccess: (data) => {
			setAuthToken(data.access_token);
			setGlobalData({ data: { ...globalData, token: data.access_token } });
			notification('success', 'login success, your are redirecting...');
			setTimeout(() => navigate('/'), 2000);
		},
		onError: (error) => {
			const errorMessage =
				error.response?.data?.message ?? 'Something went wrong';
			notification('error', errorMessage);
		}
	});

	const signupMutation = useMutation<void, ErrorApi, FormValues>({
		mutationFn: (data) => signup(data),
		onSuccess: () => {
			notification('success', 'Register success, your are redirecting...');
			setTimeout(() => navigate('/login'), 2000);
		},
		onError: (error) => {
			const errorMessage =
				error.response?.data?.message ?? 'Something went wrong';
			notification('error', errorMessage, {
				autoClose: 1000,
				delay: 0
			});
		}
	});

	const logout = useCallback(async (userId: string) => {
		removeAuthToken();
		setGlobalData({
			data: {
				...globalData,
				token: undefined,
				user: undefined,
				isAuthenticated: false
			}
		});
		navigate('/login', { state: { from: location.pathname } });
		api.defaults.headers.common.Authorization = undefined;
		await api.post(`auth/logout/${userId}`);
	}, []);

	useEffect(() => {
		if (globalData.token) {
			setIsLoading(true);
			getProfile()
				.then((data) => {
					setGlobalData({
						data: {
							...globalData,
							user: data,
							isAuthenticated: true
						}
					});

					setIsLoading(false);
				})
				.catch(async () => {
					setIsLoading(false);
					navigate('/login', { state: { from: location.pathname } });
					if (globalData.user) await logout(globalData.user.id);
				})
				.finally(() => setIsLoading(false));
		}
	}, [globalData.token]);

	return { ...globalData, signinMutation, signupMutation, logout, isLoading };
}
