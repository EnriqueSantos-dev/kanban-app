export interface GetProfileOutputDTO {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  boards: {
    id: string;
    name: string;
    columns: {
      id: string;
      name: string;
    }[];
  }[];
}
