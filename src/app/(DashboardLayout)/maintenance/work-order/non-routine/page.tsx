'use client'

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import NonRoutineTableList from '@/app/components/apps/WorkOrder/NonRoutineTableList';
import BlankCard from '@/app/components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/maintenance/work-order',
    title: 'Work Order',
  },
  {
    title: 'Non Routine Task Card',
  },
];

const Defect = () => {
  return (
    <PageContainer title="Work Order Non-Routine Task Card" description="this is Work Order Non-Routine Task Card">
      {/* breadcrumb */}
      <Breadcrumb title="Work Order Non-Routine Task Card" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <NonRoutineTableList />
      </BlankCard>
    </PageContainer>
  );
};

export default Defect;
