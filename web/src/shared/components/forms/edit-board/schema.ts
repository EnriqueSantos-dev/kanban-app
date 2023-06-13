import { z } from 'zod';

export const schema = z
	.object({
		name: z.string().min(4).max(25),
		columns: z.array(
			z.object({
				id: z.string().uuid(),
				value: z.string().trim().min(3).max(25)
			})
		)
	})
	.superRefine((data, ctx) => {
		/* eslint-disable-next-line no-plusplus */
		for (let i = 0; i < data.columns.length; i++) {
			const column = data.columns[i];

			if (
				data.columns.filter(
					(col) => col.value.toLowerCase() === column.value.toLowerCase()
				).length > 1
			) {
				ctx.addIssue({
					code: 'custom',
					message: 'Duplicated column name',
					path: [`columns.${i}.value`]
				});

				return z.NEVER;
			}
		}

		return data;
	});

export type EditBoardFormValues = z.infer<typeof schema>;
