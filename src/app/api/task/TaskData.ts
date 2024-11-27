import mock from '../mock';
import { sub } from 'date-fns';


const TaskData = [
    {
        id: 1,
        general: {
            taskId: '139-Phase 16',
            category: 'Battery',
            sub_category: 'Battery',
            classification: 'Repair',
            description: 'CARGO FIRE EXTINGUISHING 60-MINUTE TIMER',
            status: 'open',
        },
        schedule: {
            effective_date: '2024-11-15T01:23',
            is_plan_task: true,
            plan_lead_days: '',
            repeat_number: 1,
            is_daily: true,
            ground_time_required: '',
            next_task: '',
            total_frequency: 1,
            is_allow_extension: false,
            is_do_not_allow_extension: false,
            is_allow_extension_approval: false,
            is_calendar_days: true,
            is_hour_calendar_control: false,
            first_schedule_hours: '',
            first_schedule_cycles: '',
            first_schedule_days: '',
            first_schedule_date: '2024-11-15T01:23',
            is_first_schedule_earliest: true,
            first_schedule_total_hours: '',
            first_schedule_total_cycles: '',
            first_schedule_total_days: '',
            is_whichever_occurs: false,
            repeat_schedule_hours: '',
            repeat_schedule_cycles: '',
            repeat_schedule_days: '',
            repeat_schedule_date: '2024-11-15T01:23',
            is_repeat_schedule_earliest: true,
            limit_schedule_hours: '',
            limit_schedule_cycles: '',
            limit_schedule_days: '',
            limit_schedule_date: '2024-11-15T01:23',
        },
        aircraft: [],
        task_card_control: [
            {
                taskCard: '26-400-00-03',
                type: 'Routine',
                category: 'Phase16',
                description: 'CARGO FIRE EXTINGUISHING 60-MINUTE TIMER',
                ata: '002',
                aircraft_effectivity: 'B',
                status: 'open',
            },
        ],
        attachment: [],
        informational: {
            createdBy: 'ACTYPSERMS',
            createdDate: '2024-11-15T01:23',
            lastEditedBy: 'GEVERFOREVER',
            lastEditedDate: '2024-11-15T01:23',
        },
    },

];

mock.onGet('/api/data/task').reply(() => {
    return [200, TaskData];
});

export default TaskData;