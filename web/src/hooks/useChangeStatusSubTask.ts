import { useMutation } from '@tanstack/react-query';

import { updateSubTaskStatus } from '~/services/tasks.service';

export const useChangeStatusSubTask = () =>
	useMutation({
		mutationFn: updateSubTaskStatus
	});
