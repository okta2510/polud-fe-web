"use client";
import React from "react";
import { useEffect, useState } from "react";

import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';

// components

import NewsletterCampaign from "@/app/components/dashboards/analytical/TheNewsletterCampaign";
import BandwidthUsage from "@/app/components/dashboards/analytical/TheBandwidthUsage";
import DownloadCount from "@/app/components/dashboards/analytical/TheDownloadCount";
import ProfileCard from "@/app/components/dashboards/analytical/TheProfileCard";
import BlogCard from "@/app/components/dashboards/analytical/TheBlogCard";
import TopCards from "@/app/components/dashboards/classic/TheTopCards";
import OurVisitors from "@/app/components/dashboards/classic/TheOurVisitors";
import CurrentVisits from "@/app/components/dashboards/classic/TheCurrentVisits";
import ProjectsData from "@/app/components/dashboards/classic/TheProjectsData";
import RecentComments from "@/app/components/dashboards/classic/TheRecentComments";
import TodoList from "@/app/components/dashboards/classic/TheTodoList";


const BCrumb = [
  {
    to: '/',
    title: 'Dashboard',
  },
  {
    title: 'Classic',
  },
];

export default function Classic() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Classic Dashboard" description="this is Dashboard">
      {/* breadcrumb */}
      <Breadcrumb title="Classic" items={BCrumb} />
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TopCards />
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <BandwidthUsage isLoading={isLoading} />
              </Grid>
              <Grid item xs={12}>
                <DownloadCount isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4}>
            <OurVisitors isLoading={isLoading} />
          </Grid>

          <Grid item xs={12} lg={4}>
            <CurrentVisits />
          </Grid>

          <Grid item xs={12} lg={4}>
            <BlogCard />
          </Grid>
          <Grid item xs={12} lg={8}>
            <NewsletterCampaign isLoading={isLoading} />
          </Grid>

          <Grid item xs={12} lg={8}>
            <ProjectsData />
          </Grid>

          <Grid item xs={12} lg={4}>
            <ProfileCard />
          </Grid>

          <Grid item xs={12} lg={6}>
            <RecentComments />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TodoList />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
