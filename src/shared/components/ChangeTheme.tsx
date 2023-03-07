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
		<div className="px-6 py-4">
			<div className="bg-lightGrey dark:bg-veryDarkGrey flex h-12 items-center justify-evenly rounded">
				<SunSvg />
				<label className="bg-purple relative h-5 w-10 cursor-pointer rounded-full p-1">
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

					<input type="checkbox" hidden onChange={handleChangeTheme} />
				</label>
				<MoonSvg />
			</div>
		</div>
	);
}
