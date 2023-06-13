export interface UpdateBoardOutPutDto {
	name: string;
	columns: {
		id: string;
		name: string;
	}[];
}
