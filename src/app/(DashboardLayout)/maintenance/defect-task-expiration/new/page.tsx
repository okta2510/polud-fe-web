'use client'

import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import DefectTaskNew from '@/app/components/apps/DefectTask/DefectTaskNew';
import BlankCard from '@/app/components/shared/BlankCard';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/maintenance/defect-task-expiration',
    title: 'Defect & Task Expiration',
  },
  {
    title: 'Add New',
  },
];

const DefectTaskAddNew = () => {
  return (
    <PageContainer title="Defect & Task Expiration" description="this is Defect & Task Expiration">
      {/* breadcrumb */}
      <Breadcrumb title="Defect & Task Expiration" items={BCrumb} />
      {/* end breadcrumb */}
      <BlankCard>
        <DefectTaskNew />
      </BlankCard>
    </PageContainer>
  );
};

export default DefectTaskAddNew;