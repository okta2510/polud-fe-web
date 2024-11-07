"use client";
import React from "react";
import { useEffect, useState } from "react";

import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";

// components
import BarCards from "@/app/components/dashboards/minimal/TheBarCards";
import CurrentVisits from "@/app/components/dashboards/minimal/TheCurrentVisits";
import BrowserStats from "@/app/components/dashboards/minimal/TheBrowserStats";
import TotalRevenue from "@/app/components/dashboards/minimal/TheTotalRevenue";
import SalesPrediction from "@/app/components/dashboards/minimal/TheSalesPrediction";
import SalesDifference from "@/app/components/dashboards/minimal/TheSalesDifference";
import BlogCard from "@/app/components/dashboards/minimal/TheBlogCard";
import WeeklyStats from "@/app/components/dashboards/minimal/TheWeeklyStats";
import MedicalproBranding from "@/app/components/dashboards/minimal/TheMedicalProBranding";

const BCrumb = [
  {
    to: "/",
    title: "Dashboard",
  },
  {
    title: "Minimal",
  },
];

export default function Minimal() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer title="Minimal Dashboard" description="this is Dashboard">
      {/* breadcrumb */}
      <Breadcrumb title="Minimal" items={BCrumb} />
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BarCards isLoading={isLoading} />
          </Grid>

          <Grid item xs={12} lg={8}>
            <CurrentVisits />
          </Grid>

          <Grid item xs={12} lg={4}>
            <BrowserStats />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TotalRevenue isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SalesPrediction isLoading={isLoading} />
              </Grid>
              <Grid item xs={12}>
                <SalesDifference isLoading={isLoading} />
              </Grid>
            </Grid>
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
