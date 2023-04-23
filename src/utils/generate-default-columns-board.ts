export const generateDefaultColumnsBoard = () => [
	{
		id: crypto.randomUUID(),
		value: 'To Do'
	},
	{
		id: crypto.randomUUID(),
		value: 'In Progress'
	},
	{
		id: crypto.randomUUID(),
		value: 'Done'
	}
];
