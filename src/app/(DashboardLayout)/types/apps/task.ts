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
  general: {
    taskCard: string;
    type: string;
    category: string;
    description: string;
    ata: string;
    aircraft_effectivity: string;
    status: string;
  },
  material?: {
    partNumbers: [];
    zones: [];
    panels: [];
  };
  informational: {
    createdBy: string;
    createdDate: string;
    lastEditedBy: string;
    lastEditedDate: string;
  }
}