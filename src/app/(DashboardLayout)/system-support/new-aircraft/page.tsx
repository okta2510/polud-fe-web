'use client'

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import AirCraftNew from '@/app/components/apps/AirCraft/AirCraftNew';
import BlankCard from '@/app/components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/system-support/aircraft',
    title: 'Aircraft',
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
        <AirCraftNew />
      </BlankCard>
    </PageContainer>
  );
};

export default AirCraftSeriesAddNew;
