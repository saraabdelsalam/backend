export class CreateGoalDto {
  title: string;
  description: string;
  deadline: string; // ISO date string
  isPublic: boolean;
  parentId?: string | null;
  order: number;
}