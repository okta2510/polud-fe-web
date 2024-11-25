'use client'

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import WorkOrderNew from '@/app/components/apps/WorkOrder/WorkOrderNew';
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
    title: 'Add New',
  },
];

const AirCraftSeriesAddNew = () => {
  return (
    <PageContainer title="Work Order" description="this is Work Order">
      {/* breadcrumb */}
      <Breadcrumb title="Work Order" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <WorkOrderNew />
      </BlankCard>
    </PageContainer>
  );
};

export default AirCraftSeriesAddNew;
