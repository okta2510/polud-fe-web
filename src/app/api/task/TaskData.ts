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
        status: 'open',
    },
    {
        taskId: 3,
        category: 'Battery',
        classification: 'Repair',
        description: chance.paragraph({ sentences: 2 }),
        status: 'open',
    },
    {
        taskId: 4,
        category: 'Battery',
        classification: 'Repair',
        description: chance.paragraph({ sentences: 2 }),
        status: 'open',
    },
    {
        taskId: 5,
        category: 'Battery',
        classification: 'Repair',
        description: chance.paragraph({ sentences: 2 }),
        status: 'open',
    }
];

mock.onGet('/api/data/task').reply(() => {
    return [200, TaskData];
});

export default TaskData;