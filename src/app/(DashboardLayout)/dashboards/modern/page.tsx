"use client";
import React from "react";
import { useEffect, useState } from "react";

import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';

// components
import CongratulationsCard from "@/app/components/dashboards/modern/TheCongratulationsCard";
import Purchases from "@/app/components/dashboards/modern/ThePurchases";
import TotalEarnings from "@/app/components/dashboards/modern/TheTotalEarnings";
import RevenueUpdatesChart from "@/app/components/dashboards/modern/TheRevenueUpdatesChart";
import MonthlyEarningsChart from "@/app/components/dashboards/modern/TheMonthlyEarningsChart";
import Customer from "@/app/components/dashboards/modern/TheCustomer";
import TotalSales from "@/app/components/dashboards/modern/TheTotalSales";
import ProductPerformanceTable from "@/app/components/dashboards/modern/TheProductPerformanceTable";
import ProfileCard from "@/app/components/dashboards/analytical/TheProfileCard";
import ActivityTimeline from "@/app/components/dashboards/analytical/TheActivityTimeline";
import MyContacts from "@/app/components/dashboards/analytical/TheMyContacts";
import BlogCard from "@/app/components/dashboards/minimal/TheBlogCard";
import WeeklyStats from "@/app/components/dashboards/minimal/TheWeeklyStats";
import MedicalproBranding from "@/app/components/dashboards/minimal/TheMedicalProBranding";

const BCrumb = [
  {
    to: '/',
    title: 'Dashboard',
  },
  {
    title: 'Modern',
  },
];

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Modern Dashboard" description="this is Dashboard">
      {/* breadcrumb */}
      <Breadcrumb title="Modern" items={BCrumb} />
      <Box>
        <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12} lg={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={7}>
                <CongratulationsCard />
              </Grid>
              <Grid item xs={12} lg={5}>
                <Purchases />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4}>
            <TotalEarnings />
          </Grid>

          <Grid item xs={12} lg={8}>
            <RevenueUpdatesChart isLoading={isLoading} />
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MonthlyEarningsChart isLoading={isLoading} />
              </Grid>
              <Grid item xs={12}>
                <Customer isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4}>
            <TotalSales isLoading={isLoading} />
          </Grid>

          <Grid item xs={12} lg={8}>
            <ProductPerformanceTable />
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ProfileCard />
              </Grid>
              <Grid item xs={12}>
                <MyContacts />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={8}>
            <ActivityTimeline />
          </Grid>

          <Grid item xs={12} lg={4}>
            <BlogCard />
          </Grid>
          <Grid item xs={12} lg={4}>
            <WeeklyStats isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <MedicalproBranding />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
