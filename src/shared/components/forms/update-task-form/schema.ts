import { z } from 'zod';

export const schema = z.object({
	name: z.string().min(5).max(50).optional(),
	description: z.string().max(255).optional(),
	subtasks: z
		.array(
			z.object({
				id: z.string().uuid(),
				value: z.string().trim().min(5).max(50),
				isDone: z.boolean().default(false)
			})
		)
		.optional()
		.default([]),
	columnId: z.string().uuid()
});

export type UpdateTaskFormValues = z.infer<typeof schema>;
