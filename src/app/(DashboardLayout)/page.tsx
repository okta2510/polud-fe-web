"use client";
import React from "react";
import { useEffect, useState } from "react";

import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import { useTranslation } from 'react-i18next';
// components
import Welcome from "@/app/(DashboardLayout)/layout/shared/welcome/Welcome";

import SalesOverview from "@/app/components/dashboards/analytical/TheSalesOverview";
import OurVisitors from "@/app/components/dashboards/analytical/TheOurVisitors";
import NewsletterCampaign from "@/app/components/dashboards/analytical/TheNewsletterCampaign";
import BandwidthUsage from "@/app/components/dashboards/analytical/TheBandwidthUsage";
import DownloadCount from "@/app/components/dashboards/analytical/TheDownloadCount";
import WeatherCard from "@/app/components/dashboards/analytical/TheWeatherCard";
import ProfileCard from "@/app/components/dashboards/analytical/TheProfileCard";
import ActivityTimeline from "@/app/components/dashboards/analytical/TheActivityTimeline";
import MyContacts from "@/app/components/dashboards/analytical/TheMyContacts";
import BlogCard from "@/app/components/dashboards/analytical/TheBlogCard";

const BCrumb = [
  {
    // title: "Dashboard",
  },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title={t('Welcome Sir,')} description="this is Dashboard">
      {/* breadcrumb */}
      <Breadcrumb title={t('Welcome Sir,')} items={BCrumb} />
      
      <Box>
        {/* <Grid container spacing={3}>
        <Grid item xs={12} lg={3}></Grid>
          <Grid item xs={12} lg={6}>
              <img src="/images/backgrounds/sidebar-profile-bg2.jpg" style={{ width: '100%', height: 'auto' }} />
          </Grid>
        </Grid> */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <OurVisitors isLoading={isLoading} />
          </Grid>

          {/* <Grid item xs={12} lg={4}>
            <BlogCard />
          </Grid> */}
          <Grid item xs={12} lg={12}>
            <NewsletterCampaign isLoading={isLoading} />
          </Grid>

          {/* <Grid item xs={12} lg={4}>
            <BandwidthUsage isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <DownloadCount isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <WeatherCard />
          </Grid> */}

          {/* <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ProfileCard />
              </Grid>
              <Grid item xs={12}>
                <MyContacts />
              </Grid>
            </Grid>
          </Grid> */}
          {/* <Grid item xs={12} lg={8}>
            <ActivityTimeline />
          </Grid> */}
        </Grid>
        <Welcome />
      </Box>
    </PageContainer>
  );
}
