export interface TaskType {
    id: number | string;
    description: string;
    taskId: string;
    classification: string;
    status: string;
    category: string;
    subCategory: string;
    actions: string;
    created: Date;
  }