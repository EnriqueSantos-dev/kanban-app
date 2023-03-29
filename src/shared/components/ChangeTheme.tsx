import * as Switch from '@radix-ui/react-switch';
import MoonSvg from '~/assets/moon.svg';
import SunSvg from '~/assets/sun.svg';
import { useTheme } from '~/hooks/useTheme';
import { cn } from '~/utils/cn';

export function ChangeThemeButton() {
	const { theme, setTheme } = useTheme();

	function handleChangeTheme() {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	}

	return (
		<div
			role="button"
			className="bg-lightGrey dark:bg-veryDarkGrey flex h-12 w-full items-center justify-evenly rounded"
		>
			<SunSvg />
			<Switch.Root
				className="bg-purple dark:focus:ring-offset-veryDarkGrey focus:ring-purple relative flex h-5 w-10 items-start rounded-full px-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
				onCheckedChange={handleChangeTheme}
			>
				<Switch.Thumb asChild>
					<svg
						width={15}
						height={15}
						className={cn(
							'transition-transform absolute top-1/2 -translate-y-1/2 block',
							{
								'translate-x-4': theme === 'dark'
							}
						)}
					>
						<circle cx="50%" cy="50%" r="50%" fill="white" />
					</svg>
				</Switch.Thumb>
			</Switch.Root>
			<MoonSvg />
		</div>
	);
}
