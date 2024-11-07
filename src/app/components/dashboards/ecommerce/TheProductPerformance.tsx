import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Stack,
  Typography,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import SktProductPerformance from "../skeleton/ecommerce/SktProductPerformance";

interface ProductPerformancetwoCardProps {
  isLoading: boolean;
}

const ProductPerformance = ({ isLoading }: ProductPerformancetwoCardProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      height: 267,
      stacked: true,
      toolbar: { show: false },
      foreColor: "#adb0bb",
      fontFamily: "inherit",
      sparkline: { enabled: false },
    },
    colors: [primary, secondary],
    fill: { type: "solid", opacity: 1 },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "25%",
        borderRadius: [6],
        borderRadiusApplication: "end",
      },
    },
    grid: {
      show: false,
      borderColor: "transparent",
      padding: { left: 0, right: 0, bottom: 0 },
    },
    dataLabels: { enabled: false },
    markers: { size: 0 },
    legend: { show: false },
    xaxis: {
      type: "category",
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      min: 100,
      max: 400,
      tickAmount: 3,
    },

    stroke: {
      show: true,
      width: 2,
      curve: "smooth",
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: "Expence",
      data: [300, 300, 180, 320, 250, 300, 300],
    },
    {
      name: "Budget",
      data: [60, 90, 80, 60, 70, 100, 80],
    },
  ];

  //   2
  const optionscolumn2chart: any = {
    chart: {
      type: "line",
      height: 30,
      toolbar: { show: false },
      foreColor: "#adb0bb",
      fontFamily: "inherit",
      sparkline: { enabled: true },
    },
    colors: [secondary],
    fill: { type: "solid", opacity: 1 },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "35%", borderRadius: 0 },
    },
    grid: {
      show: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 2,
      curve: "smooth",
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };
  const seriescolumn2chart = [
    {
      name: "",
      data: [35, 60, 30, 55, 40],
    },
  ];

  return (
    <>
      {isLoading ? (
        <SktProductPerformance />
      ) : (
        <DashboardCard
          title="Products Performance" subtitle="Budget and expance of last year"
          action={
            <Stack spacing={3} mt={5} direction="row">
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 9,
                    height: 9,
                    bgcolor: primary,
                    svg: { display: "none" },
                  }}
                ></Avatar>
                <Typography
                  variant="subtitle2"
                  fontSize="12px"
                  color="primary.main"
                >
                  Expence
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 9,
                    height: 9,
                    bgcolor: secondary,
                    svg: { display: "none" },
                  }}
                ></Avatar>
                <Typography
                  variant="subtitle2"
                  fontSize="12px"
                  color="secondary.main"
                >
                  Budget
                </Typography>
              </Stack>
            </Stack>
          }
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={5}>
              <Typography variant="h5">$93,438.78</Typography>
              <Typography variant="subtitle2" fontSize="12px">
                Budget
              </Typography>

              <Typography variant="h5" mt={3}>
                $32,839
              </Typography>
              <Typography variant="subtitle2" fontSize="12px">
                Expence
              </Typography>

              <Box my={4} height="30px">
                <Chart
                  options={optionscolumn2chart}
                  series={seriescolumn2chart}
                  type="line"
                  height={30}
                  width={"100%"}
                />
              </Box>

              <Button variant="contained" color="secondary">
                Download Report
              </Button>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Box height="267px">
                <Chart
                  options={optionscolumnchart}
                  series={seriescolumnchart}
                  type="bar"
                  height={267}
                  width={"100%"}
                />
              </Box>
            </Grid>
          </Grid>
        </DashboardCard>
      )}
    </>
  );
};

export default ProductPerformance;
