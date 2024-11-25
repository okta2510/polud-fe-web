import mock from '../mock';
import { sub } from 'date-fns';
import { Chance } from 'chance';

const chance = new Chance();

const AirCraftData = [
  {
    id: 1,
    title: 'air series',
    created: sub(new Date(), { days: 10, hours: 8, minutes: 69 }),
    description: chance.paragraph({ sentences: 2 }),
    type: 'A320',
    series: 'air series - 214',
    status: 'inactive',
  },
];

mock.onGet('/api/data/aircraft-series').reply(() => {
  return [200, AirCraftData];
});

export default AirCraftData;
