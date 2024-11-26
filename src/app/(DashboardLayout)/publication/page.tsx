'use client'

import PageContainer from '@/app/components/container/PageContainer';
import CommingSoonCard from '@/app/components/apps/CommingSoon/CommingSoonCard';
import BlankCard from '@/app/components/shared/BlankCard';
import { Box } from '@mui/material';


const Publication = () => {
    return (
        <PageContainer title="Publication" description="this is Publication">
            <Box mb={5}/>
            <BlankCard>
                <CommingSoonCard />
            </BlankCard>
        </PageContainer>
    );
};

export default Publication;