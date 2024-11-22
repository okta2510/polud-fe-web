'use client'

import { Box } from '@mui/material';
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import DefectTableList from '@/app/components/apps/defect/DefectTableList';
import BlankCard from '@/app/components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Defect',
  },
];

const Defect = () => {
  return (
    <PageContainer title="Defect" description="this is Defect">
      {/* breadcrumb */}
      <Breadcrumb title="Defect" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <DefectTableList />
      </BlankCard>
    </PageContainer>
  );
};

export default Defect;
