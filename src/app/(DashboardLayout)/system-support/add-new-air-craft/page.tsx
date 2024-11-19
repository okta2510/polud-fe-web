'use client'

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import AirCraftAddNew from '@/app/components/apps/AirCraft/AirCraftAddNew';
import BlankCard from '@/app/components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/system-support/air-craft-series',
    title: 'Aircraft Series',
  },
  {
    title: 'Add New',
  },
];

const SearchTable = () => {
  return (
    <PageContainer title="Aircraft Series" description="this is Aircraft Series">
      {/* breadcrumb */}
      <Breadcrumb title="Aircraft Series" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <AirCraftAddNew />
      </BlankCard>
    </PageContainer>
  );
};

export default SearchTable;
