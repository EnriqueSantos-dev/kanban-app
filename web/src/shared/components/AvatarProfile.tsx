import * as Popover from '@radix-ui/react-popover';
import { logoutUser } from '~/services/auth.service';

type AvatarProfileProps = {
	avatarUrl: string | null;
	fallbackText: string;
};

export function AvatarProfile({ avatarUrl, fallbackText }: AvatarProfileProps) {
	return (
		<Popover.Root>
			<Popover.Trigger className="focus:ring-purple dark:focus:ring-offset-darkGrey focus:ring-offset-linesLight relative h-12 w-12 cursor-pointer overflow-hidden rounded-full outline-none focus:ring-1 focus:ring-offset-2">
				{avatarUrl ? (
					<img
						src={avatarUrl}
						loading="eager"
						alt="user avatar bg-cover w-full"
					/>
				) : (
					<span className="dark:text-mediumGrey bg-linesLight dark:bg-veryDarkGrey flex h-full w-full items-center justify-center font-bold text-white">
						{fallbackText}
					</span>
				)}
			</Popover.Trigger>

			<Popover.PopoverPortal>
				<Popover.Content
					sideOffset={5}
					className="dark:bg-darkGrey data-[state=open]:animate-fade-in border-linesLight dark:border-linesDark flex w-24 items-center justify-center rounded-lg border bg-white p-4"
				>
					<Popover.Arrow className="[&>polygon]:dark:fill-linesDark [&>polygon]:fill-linesLight" />
					<button
						type="button"
						aria-label="logout user"
						className="text-mediumGrey outline-none hover:underline focus:underline"
						onClick={logoutUser}
					>
						logout
					</button>
				</Popover.Content>
			</Popover.PopoverPortal>
		</Popover.Root>
	);
}
