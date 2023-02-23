import { useAuthContext } from '@/contexts/auth/auth-context';
import { LoadingPage } from '@/shared/components';

export function HomePage() {
	const { user, logout, isLoading } = useAuthContext();

	if (isLoading) {
		return <LoadingPage />;
	}

	return (
		<div className="container p-8">
			<h1 className="text-3xl font-bold text-black">Home Page</h1>
			<div className="flex w-full items-center justify-between">
				<p className="mt-4 text-xl">Welcome {user?.name} 👏</p>
				<button
					type="button"
					className="rounded bg-blue-500 py-2 px-4 font-bold text-white transition-colors hover:bg-blue-600"
					title="Logout"
					onClick={() => logout(user?.id as string)}
				>
					Logout
				</button>
			</div>

			<pre className="border-mediumGrey mt-3 flex snap-mandatory flex-wrap overflow-auto rounded border border-dashed p-6">
				<code className="">{JSON.stringify(user, null, 2)}</code>
			</pre>
		</div>
	);
}
