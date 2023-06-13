export interface GetTasksOutputDto {
	id: string;
	columnId: string;
	title: string;
	statusName: string;
	order: number;
	description: string | null;
	createdAt: string;
	updatedAt: string;
	subTasks: {
		id: string;
		title: string;
		isDone: boolean;
	}[];
}
