import mock from '../mock';
import { sub } from 'date-fns';
import { Chance } from 'chance';

const chance = new Chance();

const aircraftMean = [
  {
    title: 'WO320',
    price: 275,
    discount: 25,
    related: false,
    salesPrice: 350,
    category: ['books'],
    gender: 'Men',
    rating: 3,
    stock: true,
    qty: 1,
    colors: ['#1890FF'],
    photo: "/images/products/p1.jpg",
    created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
    id: 1,
    // description: chance.paragraph({ sentences: 2 }),
    description: 'GENERAL - TECHNICAL INFORMATIONAL WEIGHT AND CG',
    type: 'WO320',
    series: '214',
    status: 'active',
  },
];

mock.onGet('/api/data/defect').reply(() => {
  return [200, aircraftMean];
});

export default aircraftMean;
