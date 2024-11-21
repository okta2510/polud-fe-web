import mock from '../mock';
import { Chance } from 'chance';

const chance = new Chance();

const TaskData = [
    {
        taskId: 1,
        category: 'Battery',
        classification: 'Repair',
        description: chance.paragraph({ sentences: 2 }),
        status: 'open',
    },
    {
        taskId: 2,
        category: 'Battery',
        classification: 'Repair',
        description: chance.paragraph({ sentences: 2 }),
        status: 'cancel',
    },
    {
        taskId: 3,
        category: 'Battery',
        classification: 'Repair',
        description: chance.paragraph({ sentences: 2 }),
        status: 'applicable',
    },
    {
        taskId: 4,
        category: 'Battery',
        classification: 'Repair',
        description: chance.paragraph({ sentences: 2 }),
        status: 'not effective',
    },
    {
        taskId: 5,
        category: 'Battery',
        classification: 'Repair',
        description: chance.paragraph({ sentences: 2 }),
        status: 'pending',
    },
    {
        taskId: 6,
        category: 'Battery',
        classification: 'Repair',
        description: chance.paragraph({ sentences: 2 }),
        status: 'rejected',
    },
    {
        taskId: 7,
        category: 'Battery',
        classification: 'Repair',
        description: chance.paragraph({ sentences: 2 }),
        status: 'terminated',
    }
];

mock.onGet('/api/data/task').reply(() => {
    return [200, TaskData];
});

export default TaskData;