export interface GetTasksOutputDto {
	tasks: {
		id: string;
		title: string;
		description: string | null;
		createdAt: string;
		updatedAt: string;
		subTasks: {
			id: string;
			title: string;
			isDone: boolean;
		}[];
	}[];
}
