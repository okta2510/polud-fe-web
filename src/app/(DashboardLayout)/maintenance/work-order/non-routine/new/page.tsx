'use client'

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import NonRoutineNew from '@/app/components/apps/WorkOrder/NonRoutineNew';
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
    to: '/maintenance/work-order/non-routine',
    title: 'Non Routine Task Card',
  },
  {
    title: 'Add New',
  },
];

const AirCraftSeriesAddNew = () => {
  return (
    <PageContainer title="Work Order Non-Routine Task Card" description="this is Work Order Non-Routine Task Card">
      {/* breadcrumb */}
      <Breadcrumb title="Work Order Non-Routine Task Card" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <NonRoutineNew />
      </BlankCard>
    </PageContainer>
  );
};

export default AirCraftSeriesAddNew;
