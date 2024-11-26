import mock from '../mock';


const TaskCardData = [
    {
        id: 1,
        general: {
            taskCard: '26-400-00-03',
            type: 'Routine',
            category: 'Phase16',
            description: 'CARGO FIRE EXTINGUISHING 60-MINUTE TIMER',
            ata: '001',
            aircraft_effectivity: 'B',
            status: 'open',
        },
        material: {
            partNumbers: [
                {
                    partNumber: '117',
                    description: 'MULTIMETER - DIGITAL/ANALOG',
                    category: 'TOOL',
                    quantity: 1,
                    unitOfMeasurement: 'EA',
                    spare: 'Part',
                    reserve: 'Booked',
                },
                {
                    partNumber: 'C26006-70',
                    description: 'TEST  BOX - CARGO FIRE EXTINGUISHER SYSTEM',
                    category: 'TOOL',
                    quantity: 1,
                    unitOfMeasurement: 'EA',
                    spare: 'Part',
                    reserve: 'None',
                },
                {
                    partNumber: 'M83723/60-114AN',
                    description: 'CAP-PROTECTIVE',
                    category: 'EXPANDABLE',
                    quantity: 1,
                    unitOfMeasurement: 'EA',
                    spare: 'Part',
                    reserve: 'None',
                },
                {
                    partNumber: 'STD-1079',
                    description: 'RESISTOR - 10K OHM OR GREATER',
                    category: 'TOOL',
                    quantity: 1,
                    unitOfMeasurement: 'EA',
                    spare: 'Part',
                    reserve: 'None',
                },
                {
                    partNumber: 'STD-1168',
                    description: 'CAP - SHORTING OR FARADAY CAP',
                    category: 'TOOL',
                    quantity: 1,
                    unitOfMeasurement: 'EA',
                    spare: 'Part',
                    reserve: 'None',
                },
            ],
            zones: [
                {
                    zone: '121',
                    description: '121AF',
                    item: '1',
                    aircraft_type: '737',
                    aircraft_series: '800',
                },
            ],
            panels: [
                {
                    panel: 'panel a 121AF',
                    description: 'panel b 122AF',
                    item: '1',
                    aircraft_type: '737',
                    aircraft_series: '800',
                },
            ],
        },
        informational: {
            createdBy: 'ACTYPSERMS',
            createdDate: '2024-11-15T01:23',
            lastEditedBy: 'GEVERFOREVER',
            lastEditedDate: '2024-11-15T01:23',
        },
    }
];

mock.onGet('/api/data/task/card').reply(() => {
    return [200, TaskCardData];
});

export default TaskCardData;