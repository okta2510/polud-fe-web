'use client'

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import DefectNew from '@/app/components/apps/defect/DefectNew';
import BlankCard from '@/app/components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/maintenance/defect',
    title: 'Defect',
  },
  {
    title: 'detail',
  },
];

const AirCraftSeriesAddNew = () => {
  return (
    <PageContainer title="Defect" description="this is Defect">
      {/* breadcrumb */}
      <Breadcrumb title="Defect" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <DefectNew />
      </BlankCard>
    </PageContainer>
  );
};

export default AirCraftSeriesAddNew;
