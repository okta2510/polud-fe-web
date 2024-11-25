'use client'

import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import DefectTaskTableList from '@/app/components/apps/DefectTask/DefectTaskTableList';
const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Defect & Task Expiration',
  },
];

const DefectTask = () => {
  return (
    <PageContainer title="Defect & Task Expiration" description="this is Defect & Task Expiration">
      {/* breadcrumb */}
      <Breadcrumb title="Defect & Task Expiration" items={BCrumb} />
      {/* end breadcrumb */}
      <DefectTaskTableList />
    </PageContainer>
  );
};

export default DefectTask;