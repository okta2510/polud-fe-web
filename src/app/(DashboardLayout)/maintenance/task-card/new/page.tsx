'use client'

import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import TaskCardNew from '@/app/components/apps/Task/TaskCardNew';
import BlankCard from '@/app/components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/maintenance/task-card',
    title: 'Task Card',
  },
  {
    title: 'Add New',
  },
];

const TaskCardAddNew = () => {
  return (
    <PageContainer title="Task Card" description="this is Task Card">
      {/* breadcrumb */}
      <Breadcrumb title="Task Card" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <TaskCardNew />
      </BlankCard>
    </PageContainer>
  );
};

export default TaskCardAddNew;