'use client'

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import AirCraftMeanTableList from '@/app/components/apps/AirCraft/AirCraftMeanTableList';
import BlankCard from '@/app/components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Aircraft Mean',
  },
];

const AirCraft = () => {
  return (
    <PageContainer title="Aircraft mean" description="this is Aircraft Mean">
      {/* breadcrumb */}
      <Breadcrumb title="Aircraft" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <AirCraftMeanTableList />
      </BlankCard>
    </PageContainer>
  );
};

export default AirCraft;
