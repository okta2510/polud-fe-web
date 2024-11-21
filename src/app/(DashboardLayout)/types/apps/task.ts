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

  export interface TaskCardType {
    id: number | string;
    description: string;
    taskCard: string;
    type: string;
    status: string;
    category: string;
    actions: string;
    created: Date;
  }