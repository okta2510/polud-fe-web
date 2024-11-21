'use client'

import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import TaskNew from '@/app/components/apps/Task/TaskNew';
import BlankCard from '@/app/components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/maintenance/task',
    title: 'Task',
  },
  {
    title: 'Add New',
  },
];

const AirCraftSeriesAddNew = () => {
  return (
    <PageContainer title="Task" description="this is Task">
      {/* breadcrumb */}
      <Breadcrumb title="Task" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <TaskNew />
      </BlankCard>
    </PageContainer>
  );
};

export default AirCraftSeriesAddNew;