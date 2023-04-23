/* eslint-disable react/button-has-type */
import { forwardRef } from 'react';
import { cn } from '~/utils/cn';

interface ButtonSelectOrCreateBoardProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	isActive?: boolean;
}

export const ButtonSelectOrCreateBoard = forwardRef<
	HTMLButtonElement,
	ButtonSelectOrCreateBoardProps
>(({ isActive = false, type = 'button', ...props }, ref) => (
	<button
		type={type}
		{...props}
		ref={ref}
		className={cn(
			'group flex h-[3.18rem] w-full max-w-[16.5rem] items-center gap-3 rounded-r-full white p-4 text-left font-bold capitalize focus:outline-none transition-colors pl-6 whitespace-nowrap',
			{
				'bg-purple text-white hover:bg-purpleHover focus:bg-purpleHover':
					isActive,
				'bg-transparent text-mediumGrey hover:bg-purple/10 focus:bg-purple focus:text-white hover:text-purple dark:hover:bg-white dark:hover:text-purple':
					!isActive
			}
		)}
	>
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M0 2.889C0 2.12279 0.304376 1.38796 0.846169 0.846169C1.38796 0.304376 2.12279 1.73086e-07 2.889 1.73086e-07H13.11C13.4895 -0.000131178 13.8653 0.0744981 14.2159 0.219625C14.5665 0.364752 14.8851 0.577534 15.1535 0.845815C15.4219 1.1141 15.6347 1.43262 15.78 1.7832C15.9252 2.13377 16 2.50953 16 2.889V13.11C16.0003 13.4895 15.9257 13.8654 15.7806 14.216C15.6356 14.5667 15.4228 14.8854 15.1545 15.1538C14.8862 15.4222 14.5676 15.6351 14.217 15.7803C13.8663 15.9255 13.4905 16.0001 13.111 16H2.89C2.51053 16.0001 2.13475 15.9255 1.78412 15.7804C1.4335 15.6352 1.1149 15.4225 0.846522 15.1542C0.578148 14.8859 0.365256 14.5674 0.220008 14.2168C0.0747593 13.8662 -2.27329e-08 13.4905 0 13.111V2.889ZM1.333 8.444V13.111C1.333 13.97 2.03 14.667 2.889 14.667H9.778V8.444H1.333ZM9.778 7.111V1.333H2.888C2.4755 1.33353 2.08008 1.49784 1.78868 1.7898C1.49728 2.08177 1.33373 2.4775 1.334 2.89V7.11H9.779L9.778 7.111ZM14.667 5.778H11.11V10.222H14.666L14.667 5.778ZM14.667 11.556H11.11V14.666H13.11C13.5225 14.666 13.9181 14.5022 14.2099 14.2106C14.5017 13.919 14.6657 13.5235 14.666 13.111L14.667 11.556ZM14.667 2.89C14.6671 2.68563 14.627 2.48323 14.5488 2.29439C14.4707 2.10555 14.3561 1.93396 14.2116 1.78945C14.067 1.64493 13.8955 1.53033 13.7066 1.45218C13.5178 1.37403 13.3154 1.33387 13.111 1.334H11.111V4.445H14.667V2.89Z" />
		</svg>

		<p className="max-w-xs overflow-hidden text-ellipsis text-left">
			{props.children}
		</p>
	</button>
));
