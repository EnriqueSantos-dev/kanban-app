import { AddNewTaskFormValues } from '~/shared/components/forms/add-new-task/schema';

export function mapperTaskToCreate(data: AddNewTaskFormValues) {
	return {
		subTasks: data.subtasks.map((subtask) => ({
			title: subtask.value,
			isDone: false
		})),
		title: data.name,
		description: data.description || '',
		columnId: data.columnId
	};
}
