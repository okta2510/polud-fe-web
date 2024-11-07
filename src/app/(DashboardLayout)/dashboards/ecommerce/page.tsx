"use client";
import React from "react";
import { useEffect, useState, Suspense, lazy } from "react";

import { Box, Grid } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";

import SalesCards from "@/app/components/dashboards/ecommerce/TheSalesCards";
import ProductPerformance from "@/app/components/dashboards/ecommerce/TheProductPerformance";
import Earnings from "@/app/components/dashboards/ecommerce/TheEarnings";
import YearlySalesChart from "@/app/components/dashboards/ecommerce/TheYearlySalesChart";
import RecentTransaction from "@/app/components/dashboards/ecommerce/TheRecentTransaction";
import PerformanceTable from "@/app/components/dashboards/ecommerce/ThePerformanceTable";
import BlogCard from "@/app/components/dashboards/minimal/TheBlogCard";
import WeeklyStats from "@/app/components/dashboards/minimal/TheWeeklyStats";
import MedicalproBranding from "@/app/components/dashboards/minimal/TheMedicalProBranding";

const BCrumb = [
  {
    to: "/",
    title: "Dashboard",
  },
  {
    title: "eCommerce",
  },
];

const Ecommerce = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <PageContainer
      title="eCommerce Dashboard"
      description="this is eCommerce Dashboard"
    >
      {/* breadcrumb */}
      <Breadcrumb title="eCommerce" items={BCrumb} />
      <Box>
        <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12}>
            <SalesCards isLoading={isLoading} />
          </Grid>
          {/* column */}
          <Grid item xs={12} lg={8}>
            <ProductPerformance isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Earnings />
              </Grid>
              <Grid item xs={12}>
                <YearlySalesChart isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4}>
            <RecentTransaction />
          </Grid>

          <Grid item xs={12} lg={8}>
            <PerformanceTable />
          </Grid>

          <Grid item xs={12} lg={4}>
            <Suspense fallback={<div>Loading...</div>}>
              <WeeklyStats isLoading={isLoading} />
            </Suspense>
          </Grid>
          <Grid item xs={12} lg={4}>
            <MedicalproBranding />
          </Grid>
          <Grid item xs={12} lg={4}>
            <BlogCard />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Ecommerce;
