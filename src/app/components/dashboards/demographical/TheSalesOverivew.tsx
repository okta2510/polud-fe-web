import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";

import DashboardCard from "../../shared/DashboardCard";
import SktSalesOverview from "../skeleton/demographical/SktSalesOverview";
import { Box } from "@mui/material";

interface SalesOverviewtwoCardProps {
  isLoading: boolean;
}

const SalesOverview = ({ isLoading }: SalesOverviewtwoCardProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      height: 275,
      offsetX: -15,
      toolbar: { show: false },
      foreColor: "#adb0bb",
      fontFamily: "inherit",
      sparkline: { enabled: false },
    },
    colors: [primary, secondary],
    fill: { type: "solid", opacity: 1 },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "35%", borderRadius: 0 },
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
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yaxis: {
      show: true,
      min: 100,
      max: 400,
      tickAmount: 3,
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    { name: "Ample", data: [355, 390, 300, 350, 390, 180, 250] },
    { name: "Pixel", data: [280, 250, 325, 215, 250, 310, 170] },
  ];

  return (
    <>
      {isLoading ? (
        <SktSalesOverview />
      ) : (
        <DashboardCard
          title="Sales Overview"
          subtitle="Ample Admin Vs Pixel Admin"
        >
          <Box height="275px">
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="bar"
              height={275}
              width={"100%"}
            />
          </Box>
        </DashboardCard>
      )}
    </>
  );
};

export default SalesOverview;
