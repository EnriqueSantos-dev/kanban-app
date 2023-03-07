import * as Popover from '@radix-ui/react-popover';
import { ChangeThemeButton } from './ChangeTheme';


export function MobileMenuPopover() {
	return (
		<Popover.Root defaultOpen modal>
			<Popover.Trigger className="group flex w-4 shrink-0 cursor-pointer items-center justify-center outline-none md:hidden">
				<svg
					className="group-hover:[&_path]:stroke-purpleHover transition-all group-data-[state=open]:rotate-180"
					width="10"
					height="7"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6" />
				</svg>
			</Popover.Trigger>

			<Popover.Content asChild>
				<div className="dark:bg-darkGrey animate-fade-in absolute left-1/2 top-10 flex w-[300px] flex-col gap-4 rounded-lg bg-white shadow-sm md:hidden">
					<div className="px-6 pt-4 pb-5">
						<p className="text-mediumGrey text-xs font-bold uppercase tracking-[2.4px]">
							All boards (1)
						</p>
					</div>

					<div className="flex max-h-80 snap-mandatory flex-col gap-1 overflow-y-auto pr-6">
						<button
							type="button"
							className="hover:bg-purpleHover text-mediumGrey hover:text-purple group flex h-[3.18rem] w-full max-w-[16.5rem] items-center gap-2 rounded-r-full bg-white p-4 text-left font-bold capitalize focus:outline-none"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								className="shrink-0"
							>
								<path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
							</svg>

							<p className="max-w-xs overflow-hidden text-ellipsis text-left">
								Test
							</p>
						</button>
					</div>

					<ChangeThemeButton />
				</div>
			</Popover.Content>
		</Popover.Root>
	);
}
