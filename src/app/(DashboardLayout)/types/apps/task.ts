export interface TaskType {
  id: number | string;
  general: {
    taskId: string;
    category: string;
    sub_category: string;
    classification: string;
    description: string;
    status: string;
  },
  schedule: {
    effective_date: string;
    is_plan_task: boolean;
    plan_lead_days: string;
    repeat_number: string | number;
    is_daily: boolean;
    ground_time_required: string;
    next_task: string;
    total_frequency: string | number;
    is_allow_extension: boolean;
    is_do_not_allow_extension: boolean;
    is_allow_extension_approval: boolean;
    is_calendar_days: boolean;
    is_hour_calendar_control: boolean;
    first_schedule_hours: string;
    first_schedule_cycles: string;
    first_schedule_days: string;
    first_schedule_date: string;
    is_first_schedule_earliest: boolean;
    first_schedule_total_hours: string;
    first_schedule_total_cycles: string;
    first_schedule_total_days: string;
    is_whichever_occurs: boolean;
    repeat_schedule_hours: string;
    repeat_schedule_cycles: string;
    repeat_schedule_days: string;
    repeat_schedule_date: string;
    is_repeat_schedule_earliest: boolean;
    limit_schedule_hours: string;
    limit_schedule_cycles: string;
    limit_schedule_days: string;
    limit_schedule_date: string;
  },
  aircraft: [],
  task_card_control: [],
  attachment: [],
  informational: {
    createdBy: string;
    createdDate: string;
    lastEditedBy: string;
    lastEditedDate: string;
  },
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