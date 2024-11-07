import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import SktNewsletterCampaign from "../skeleton/demographical/SktNewsletterCampaign";

interface NewsletterCampaigntwoCardProps {
  isLoading: boolean;
}

const NewsletterCampaign = ({ isLoading }: NewsletterCampaigntwoCardProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "area",
      fontFamily: "inherit",
      height: 275,
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
    },
    colors: [primary, secondary],
    fill: {
      type: "gradient",
      opacity: ["0.1", "0.1"],
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      border: 1,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    },
    grid: {
      show: true,
      borderColor: "rgba(0, 0, 0, .2)",
      color: "rgba(0, 0, 0, .2)",
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: "Earnings",
      data: [0, 5, 6, 8, 25, 9, 11, 24],
    },
    {
      name: "Expense",
      data: [0, 3, 1, 2, 8, 1, 5, 1],
    },
  ];

  return (
    <>
      {isLoading ? (
        <SktNewsletterCampaign />
      ) : (
        <DashboardCard
          title="Newsletter Campaign"
          subtitle="Overview of Newsletter Campaign"
        >
          <Box height="275px">
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="area"
              height={275}
              width={"100%"}
            />
          </Box>
        </DashboardCard>
      )}
    </>
  );
};

export default NewsletterCampaign;
