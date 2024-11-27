export interface DefectTaskType {
    id: string | number;
    is_defect: boolean;
    is_task: boolean;
    is_work_order: boolean;
    is_selected: boolean;
    task: {
        task_id: string;
        category: string;
        sub_category: string;
        classification: string;
        description: string;
        status: string;
        ata: string;
        repeat: number | string;
        aircraft: string;
        ground_time: string;
    },
    defect: {
        defect_id: string;
        defect_type: string;
        item: string;
        mddr: string;
        groundtime: string;
        capability_area: string;
        mel: string;
        gmm: string;
        aircraft: string;
    },
    work_order: {
        general: {
            work_order_number: string;
            status: string;
            category: string;
            description: string;
            location: string;
            site: string;
            priority: string;
            aircraft: string;
            aircraft_serial_number: string;
            type_series1: string;
            type_series2: string;
            schedule_start_date: string;
            schedule_start_hours: string;
            schedule_start_minute: string;
            schedule_end_date: string;
            schedule_end_hours: string;
            schedule_end_minute: string;
            flight_number: string;
            actual_start_date: string;
            actual_start_hours: string;
            actual_start_minute: string;
            actual_end_date: string;
            actual_end_hours: string;
            actual_end_minute: string;
        }
    },
    position: string;
    initial_schedule: {
        hours: string;
        days: string;
        cycles: string;
    },
    actual: {
        hours: string;
        days: string;
        cycles: string;
    },
    remaining: {
        hours: string;
        days: string;
        cycles: string;
    },
    totals: {
        aircraft_hours: string;
        aircraft_cycles: string;
        time_as_of: string;
    },
    due_date: string;
    created: string;
}