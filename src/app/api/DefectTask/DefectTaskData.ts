import { is } from 'date-fns/locale';
import mock from '../mock';
import { sub } from 'date-fns';

const DefectTaskData = [
    {
        is_defect: false,
        is_task: true,
        is_work_order: false,
        is_selected: false,
        aircraft: 'A320',
        task: {
            task_id: '738-Phase 16',
            category: 'Battery',
            sub_category: '',
            ata: '',
            repeat: 1,
        },
        defect: {
            defect_id: '',
            defect_type: '',
            item: '',
            mddr: '',
            ground_time: '',
            capability_area: '',
            mel: '',
            gmm: '',
        },
        work_order: {
            general: {
                work_order_number: '',
                status: '',
                category: '',
                description: '',
                location: '',
                site: '',
                priority: '',
                aircraft: 'A320',
                aircraft_serial_number: '',
                type_series1: '',
                type_series2: '',
                schedule_start_date: '',
                schedule_start_hours: '',
                schedule_start_minute: '',
                schedule_end_date: '',
                schedule_end_hours: '',
                schedule_end_minute: '',
            },
            informational: {
                createdBy: 'ACTYPSERMS',
                createdDate: '2024-11-15T01:23',
                lastEditedBy: 'GEVERFOREVER',
                lastEditedDate: '2024-11-15T01:23',
            },
        },
        position: '',
        initial_schedule: {
            hours: '975',
            days: '170',
            cycles: '744',
        },
        actual: {
            hours: '326:48',
            days: '53',
            cycles: '255',
        },
        remaining: {
            hours: '648:12',
            days: '117',
            cycles: '489',
        },
        totals: {
            aircraft_hours: '33018:15',
            aircraft_cycles: '24834',
            time_as_of: sub(new Date(), { days: 11, hours: 6, minutes: 20 }),
        },
        due_date: new Date(),
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    },
];

mock.onGet('/api/data/defect-task').reply(() => {
    return [200, DefectTaskData];
});


export default DefectTaskData;