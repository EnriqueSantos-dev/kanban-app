export interface CreateTaskOutPutDto {
	id: string;
	title: string;
	description: string;
	columnId: string;
	subTasks: Array<{
		id: string;
		title: string;
		isDone: boolean;
	}>;
}
