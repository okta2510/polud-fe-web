import mock from '../mock';
import { Chance } from 'chance';

const chance = new Chance();

const TaskCardData = [
    {
        id: 1,
        taskCard: 'B789-70-818-02-01-IDN',
        type: 'Repair',
        category: 'Battery',
        description: chance.paragraph({ sentences: 2 }),
        status: 'open',
    },
    {
        id: 2,
        taskCard: 'B789-70-818-02-02-IDN',
        type: 'Repair',
        category: 'Battery',
        description: chance.paragraph({ sentences: 2 }),
        status: 'cancel',
    },
    {
        id: 3,
        taskCard: 'B789-70-818-02-03-IDN',
        type: 'Repair',
        category: 'Battery',
        description: chance.paragraph({ sentences: 2 }),
        status: 'applicable',
    },
    {
        id: 4,
        taskCard: 'B789-70-818-02-04-IDN',
        type: 'Repair',
        category: 'Battery',
        description: chance.paragraph({ sentences: 2 }),
        status: 'not effective',
    },
    {
        id: 5,
        taskCard: 'B789-70-818-02-05-IDN',
        type: 'Repair',
        category: 'Battery',
        description: chance.paragraph({ sentences: 2 }),
        status: 'pending',
    },
    {
        id: 6,
        taskCard: 'B789-70-818-02-06-IDN',
        type: 'Repair',
        category: 'Battery',
        description: chance.paragraph({ sentences: 2 }),
        status: 'rejected',
    },
    {
        id: 7,
        taskCard: 'B789-70-818-02-06-IDN',
        type: 'Repair',
        category: 'Battery',
        description: chance.paragraph({ sentences: 2 }),
        status: 'terminated',
    },
];

mock.onGet('/api/data/task/card').reply(() => {
    return [200, TaskCardData];
});

export default TaskCardData;