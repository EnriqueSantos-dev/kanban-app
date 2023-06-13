import { z } from 'zod';

export const schema = z.object({
	name: z.string().trim().min(5).max(50),
	description: z.optional(z.string().trim().max(255)),
	subtasks: z.array(
		z.object({
			id: z.optional(z.string().uuid()),
			value: z.string().trim().min(5).max(50)
		})
	),
	columnId: z.string().uuid()
});

export type AddNewTaskFormValues = z.infer<typeof schema>;
