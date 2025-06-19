export class UpdateGoalDto {
  title?: string;
  description?: string;
  deadline?: string;
  isPublic?: boolean;
  parentId?: string | null;
  order?: number;
}
