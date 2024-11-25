'use client'

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import AirCraftSeriesNew from '@/app/components/apps/AirCraft/AirCraftSeriesNew';
import BlankCard from '@/app/components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/system-support/aircraft-series',
    title: 'Aircraft Series',
  },
  {
    title: 'detail',
  },
];

const AirCraftSeriesEdit = () => {
  return (
    <PageContainer title="Aircraft Series" description="this is Aircraft Series">
      {/* breadcrumb */}
      <Breadcrumb title="Aircraft Series" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <AirCraftSeriesNew />
      </BlankCard>
    </PageContainer>
  );
};

export default AirCraftSeriesEdit;
