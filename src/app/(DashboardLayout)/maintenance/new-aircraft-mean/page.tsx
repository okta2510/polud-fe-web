'use client'

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import AirCraftMeanNew from '@/app/components/apps/AirCraft/AirCraftMeanNew';
import BlankCard from '@/app/components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/maintenance/aircraft-mean',
    title: 'Aircraft Mean',
  },
  {
    title: 'Add New',
  },
];

const AirCraftSeriesAddNew = () => {
  return (
    <PageContainer title="Aircraft Series" description="this is Aircraft Series">
      {/* breadcrumb */}
      <Breadcrumb title="Aircraft Series" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <AirCraftMeanNew />
      </BlankCard>
    </PageContainer>
  );
};

export default AirCraftSeriesAddNew;
