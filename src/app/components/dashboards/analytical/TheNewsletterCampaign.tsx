import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, Box } from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import SktNewsletterCampaign from "../skeleton/analytical/SktNewsletterCampaign";

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
      foreColor: "#adb0bb",
      height: 365,
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
      name: "Air Time",
      data: [0, 5, 6, 8, 25, 9, 11, 24],
    },
    {
      name: "Landing",
      data: [0, 3, 1, 2, 8, 1, 5, 1],
    },
  ];

  return (
    <>
      {isLoading ? (
        <SktNewsletterCampaign />
      ) : (
        <DashboardCard
          title="Aircraft Status"
          subtitle=""
          // action={
          //   <Stack spacing={3} mt={5} direction="row">
          //     <Stack direction="row" spacing={1} alignItems="center">
          //       <Avatar
          //         sx={{
          //           width: 9,
          //           height: 9,
          //           bgcolor: primary,
          //           svg: { display: "none" },
          //         }}
          //       ></Avatar>
          //       <Typography
          //         variant="subtitle2"
          //         fontSize="12px"
          //         color="primary.main"
          //       >
          //         Air Time                </Typography>
          //     </Stack>
          //     <Stack direction="row" spacing={1} alignItems="center">
          //       <Avatar
          //         sx={{
          //           width: 9,
          //           height: 9,
          //           bgcolor: secondary,
          //           svg: { display: "none" },
          //         }}
          //       ></Avatar>
          //       <Typography
          //         variant="subtitle2"
          //         fontSize="12px"
          //         color="secondary.main"
          //       >
          //         Landing
          //       </Typography>
          //     </Stack>
          //   </Stack>
          // }
        >
          <>
            <Box height="322px">
              <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="area"
                height={322}
                width={"100%"}
              />
            </Box>
            <Stack spacing={3} mt={1} direction="row" justifyContent="center">
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
                  Air Time                </Typography>
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
                  Landing
                </Typography>
              </Stack>
            </Stack>
          </>
        </DashboardCard>
      )}
    </>
  );
};

export default NewsletterCampaign;
