'use client'

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import WorkOrderTableList from '@/app/components/apps/WorkOrder/WorkOrderTableList';
import BlankCard from '@/app/components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Work Order',
  },
];

const Defect = () => {
  return (
    <PageContainer title="Work Order" description="this is Work Order">
      {/* breadcrumb */}
      <Breadcrumb title="Work Order" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <WorkOrderTableList />
      </BlankCard>
    </PageContainer>
  );
};

export default Defect;
