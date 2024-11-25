import mock from '../mock';
import { sub } from 'date-fns';
import { Chance } from 'chance';

const chance = new Chance();

const WorkOrderData = [
  {
    title: 'WO320',
    general: {
      work_order_number: '123',
      status: 'OPEN',
      category: 'PHASE',
      description: 'ENERAL - TECHNICAL INFORMATIONAL WEIGHT AND CG',
      location: 'jakarta',
      site: 'jakarta',
      priority: 'LOW',
      aircraft: '12312',
      aircraft_serial_number: 'WO320',
      type_series1: '214',
      type_series2: '214',
      schedule_start_date: '2024-11-25',
      schedule_start_hours: '12',
      schedule_start_minute: '12',
      schedule_end_date: '2024-11-25',
      schedule_end_hours: '12',
      schedule_end_minute: '12',
      flight_number: '123',
      actual_start_date: '2024-11-25',
      actual_start_hours: '12',
      actual_start_minute: '12',
      actual_end_date: '2024-11-25',
      actual_end_hours: '12',
      actual_end_minute: '12',
    },
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    id: 1,
    // description: chance.paragraph({ sentences: 2 }),
  },
];

mock.onGet('/api/data/work-order').reply(() => {
  return [200, WorkOrderData];
});

export default WorkOrderData;
