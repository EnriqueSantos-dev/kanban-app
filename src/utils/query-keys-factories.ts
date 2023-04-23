export const userKeys = {
	profile: ['user/profile'] as const
};

export const columnKeys = {
	column: ['column'] as const,
	columnId: (id: string) => [...columnKeys.column, id] as const
};
