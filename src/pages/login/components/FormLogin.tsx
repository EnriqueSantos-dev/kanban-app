import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Label, TextField } from '~/shared/components';
import { useAuthContext } from '~/contexts/auth';

const LoginSchema = z.object({
	email: z.string().min(1, { message: 'Cannot be empty' }).trim(),
	password: z.string().min(1, { message: 'Cannot be empty' }).trim()
});

type FormValues = z.infer<typeof LoginSchema>;

export function FormLogin() {
	const { signinMutation } = useAuthContext();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: zodResolver(LoginSchema)
	});

	const submitHandler: SubmitHandler<FormValues> = (data) => {
		signinMutation.mutate(data);
	};

	return (
		<form
			className="flex w-full flex-col gap-3"
			onSubmit={handleSubmit(submitHandler)}
		>
			<Label label="Email">
				<TextField
					type="text"
					placeholder="Ex: johndoe@gmail.com"
					{...register('email')}
					errorMessage={errors.email?.message}
				/>
			</Label>

			<Label label="Password">
				<TextField
					type="password"
					placeholder="Ex: ********"
					{...register('password')}
					errorMessage={errors.password?.message}
				/>
			</Label>

			<Button.Root type="submit" isLoading={signinMutation.isLoading}>
				Login
			</Button.Root>
		</form>
	);
}
