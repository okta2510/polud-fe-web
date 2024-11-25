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
    title: 'detail',
  },
];

const AirCraftDetail = () => {
  return (
    <PageContainer title="Aircraft" description="this is Aircraft">
      {/* breadcrumb */}
      <Breadcrumb title="Aircraft" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <AirCraftNew/>
      </BlankCard>
    </PageContainer>
  );
};

export default AirCraftDetail;
