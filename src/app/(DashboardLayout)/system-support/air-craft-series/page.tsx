'use client'

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import AirCraftTableList from '@/app/components/apps/AirCraft/AirCraftTableList';
import BlankCard from '@/app/components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Aircraft Series',
  },
];

const SearchTable = () => {
  return (
    <PageContainer title="Aircraft Series" description="this is Aircraft Series">
      {/* breadcrumb */}
      <Breadcrumb title="Aircraft Series" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <AirCraftTableList />
      </BlankCard>
    </PageContainer>
  );
};

export default SearchTable;
