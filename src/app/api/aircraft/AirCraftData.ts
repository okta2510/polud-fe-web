import mock from '../mock';
import { sub } from 'date-fns';
import { Chance } from 'chance';

const chance = new Chance();

const AirCraftData = [
  {
    id: 1,
    general: {
      image: null,
      aircraft_type: 'A320',
      aircraft_name: 'Cessna 208',
      serial_number: '',
      series: '214',
      status: 'active',
      effectivity: '',
      description: 'GENERAL - TECHNICAL INFORMATIONAL WEIGHT AND CG',
    },
    optional: {},
    flight_status: {},
    other: {},
    concession: {},
    informational: {},
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
  },
  // {
  //   id: 2,
  //   general: {
  //     description: 'GENERAL - TECHNICAL INFORMATIONAL WEIGHT AND CG',
  //     aircraft_type: 'A320',
  //     aircraft_name: 'Cessna 208',
  //     series: '214',
  //     status: 'inactive',
  //   },
  //   optional: {},
  //   flight_status: {},
  //   other: {},
  //   concession: {},
  //   informational: {},
  //   created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
  // },
  // {
  //   id: 3,
  //   general: {
  //     description: 'GENERAL - TECHNICAL INFORMATIONAL WEIGHT AND CG',
  //     aircraft_type: 'A320',
  //     aircraft_name: 'Cessna 208',
  //     series: '214',
  //     status: 'maintenance',
  //   },
  //   optional: {},
  //   flight_status: {},
  //   other: {},
  //   concession: {},
  //   informational: {},
  //   created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
  // },
];

mock.onGet('/api/data/aircraft').reply(() => {
  return [200, AirCraftData];
});

export default AirCraftData;
