import mock from '../mock';
import { sub } from 'date-fns';


const TaskData = [
    {
        taskId: '738-Phase 16',
        category: 'Battery',
        classification: 'Repair',
        description: 'CARGO FIRE EXTINGUISHING 60-MINUTE TIMER',
        status: 'open',
    },
];

mock.onGet('/api/data/task').reply(() => {
    return [200, TaskData];
});

export default TaskData;