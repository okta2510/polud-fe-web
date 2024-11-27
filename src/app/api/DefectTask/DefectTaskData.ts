import { id, is } from 'date-fns/locale';
import mock from '../mock';
import { sub } from 'date-fns';

const DefectTaskData = [
    {
        id: 1,
        is_defect: false,
        is_task: true,
        is_work_order: false,
        is_selected: false,
        task: {
            task_id: '138-Phase 16',
            category: 'Battery',
            sub_category: '',
            classification: '',
            description: '',
            status: 'OPEN',
            ata: '',
            repeat: 1,
            aircraft: 'A320',
            ground_time: '',
        },
        defect: {
            defect_id: '',
            defect_type: '',
            item: '',
            mddr: '',
            groundtime: '',
            capability_area: '',
            mel: '',
            gmm: '',
            aircraft: 'A320',
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
                aircraft: '',
                aircraft_serial_number: '',
                type_series1: '',
                type_series2: '',
                schedule_start_date: '',
                schedule_start_hours: '',
                schedule_start_minute: '',
                schedule_end_date: '',
                schedule_end_hours: '',
                schedule_end_minute: '',
                flight_number: '',
                actual_start_date: '',
                actual_start_hours: '',
                actual_start_minute: '',
                actual_end_date: '',
                actual_end_hours: '',
                actual_end_minute: '',
            }
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
            time_as_of: sub(new Date(), { days: 4, hours: 6, minutes: 20 }),
        },
        due_date: new Date(),
        created: sub(new Date(), { days: 3, hours: 6, minutes: 20 }),
    },
];

mock.onGet('/api/data/defect-task').reply(() => {
    return [200, DefectTaskData];
});


export default DefectTaskData;