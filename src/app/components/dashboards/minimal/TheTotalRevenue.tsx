import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, Chip, Box } from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import SktTotalRevenue from "../skeleton/minimal/SktTotalRevenue";

interface TotalRevenueCardProps {
  isLoading: boolean;
}

const TotalRevenue = ({ isLoading }: TotalRevenueCardProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const error = theme.palette.error.main;

  // chart 1
  const totalRevenueChart: any = {
    grid: {
      show: true,
      borderColor: "rgba(0, 0, 0, .3)",
      strokeDashArray: 3,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "15%",
        endingShape: "flat",
        borderRadius: 6 
      },
    },
    colors: [primary, secondary, error],
    fill: {
      type: "solid",
      opacity: 1,
    },
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "inherit",
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
      ],
    },
    yaxis: {
      show: true,
    },
    stroke: {
      curve: "straight",
      width: 0,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      x: {
        show: false,
      },
    },
  };
  const totalRevenueseriesChart = [
    {
      name: "2015",
      data: [
        800000, 1200000, 1400000, 1300000, 1200000, 1400000, 1300000, 1300000,
        1200000,
      ],
    },
    {
      name: "2020",
      data: [
        200000, 400000, 500000, 300000, 400000, 500000, 300000, 300000, 400000,
      ],
    },
    {
      name: "2025",
      data: [
        100000, 200000, 400000, 600000, 200000, 400000, 600000, 600000, 200000,
      ],
    },
  ];

  return (
    <>
      {isLoading ? (
        <SktTotalRevenue />
      ) : (
        <DashboardCard title="Total Revenue" subtitle="Checkout Earnings">
          <>
            <Box height="280px">
              <Chart
                options={totalRevenueChart}
                series={totalRevenueseriesChart}
                type="bar"
                height={280}
                width="100%"
              />
            </Box>
          </>
        </DashboardCard>
      )}
    </>
  );
};

export default TotalRevenue;
