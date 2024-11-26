'use client'

import PageContainer from '@/app/components/container/PageContainer';
import CommingSoonCard from '@/app/components/apps/CommingSoon/CommingSoonCard';
import BlankCard from '@/app/components/shared/BlankCard';
import { Box } from '@mui/material';

const Inventory = () => {
    return (
        <PageContainer title="Inventory" description="this is Inventory">
            <Box mb={5}/>
            <BlankCard>
                <CommingSoonCard />
            </BlankCard>
        </PageContainer>
    );
};

export default Inventory;
