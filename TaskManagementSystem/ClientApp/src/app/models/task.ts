export interface Task {
  id: number;
  createDate: Date;
  requiredByDate: Date;
  taskDescription: string;
  taskStatus: string;
  taskType: string;
  assignedUser: string;
  nextActionDate: Date;
}
