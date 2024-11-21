'use client'

import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import BlankCard from '@/app/components/shared/BlankCard';
import TaskCardTableList from '@/app/components/apps/Task/TaskCardTableList';
const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        title: 'Task Card',
    },
];

const TaskCard = () => {
    return (
        <PageContainer title="Task Card" description="this is Task Card">
            {/* breadcrumb */}
            <Breadcrumb title="Task Card" items={BCrumb} />
            {/* end breadcrumb */}
            <BlankCard>
                <TaskCardTableList from="task-card" />
            </BlankCard>
        </PageContainer>
    );
};

export default TaskCard;