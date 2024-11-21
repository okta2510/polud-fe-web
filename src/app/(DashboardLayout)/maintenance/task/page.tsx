'use client'

import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import BlankCard from '@/app/components/shared/BlankCard';
import TaskTableList from '@/app/components/apps/Task/TaskTableList';
const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        title: 'Task',
    },
];

const Task = () => {
    return (
        <PageContainer title="Task" description="this is Task">
            {/* breadcrumb */}
            <Breadcrumb title="Task" items={BCrumb} />
            {/* end breadcrumb */}
            <BlankCard>
                <TaskTableList />
            </BlankCard>
        </PageContainer>
    );
};

export default Task;