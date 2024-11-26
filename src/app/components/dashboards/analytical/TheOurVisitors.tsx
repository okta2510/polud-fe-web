import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, Box } from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import SktOurVisitor from "../skeleton/analytical/SktOurVisitor";

interface OurVisitortwoCardProps {
  isLoading: boolean;
}

const OurVisitors = ({ isLoading }: OurVisitortwoCardProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const info = theme.palette.info.main;
  const grey = theme.palette.grey[100];

  // chart
  const optionscolumnchart: any = {
    labels: ["Mobile", "tablet", "Other", "Desktop"],
    chart: {
      height: 265,
      type: "donut",
      foreColor: "#adb0bb",
      fontFamily: `inherit`,
    },
    colors: [primary, secondary, grey, info],
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: { colors: ["transparent"] },
    plotOptions: {
      pie: {
        donut: {
          size: "85%",
          background: "transparent",
          labels: {
            show: false,
            name: {
              show: true,
              fontSize: "18px",
              color: undefined,
              offsetY: -10,
            },
            value: { show: false, color: "#98aab4" },
            total: { show: false, label: "Our Visitors", color: "#98aab4" },
          },
        },
      },
    },
    responsive: [{ breakpoint: 480, options: { chart: { height: 230 } } }],
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [25, 35, 35, 15];

  return (
    <>
      {isLoading ? (
        <SktOurVisitor />
      ) : (
        <DashboardCard
          title="Aircraft Inspections"
          subtitle="Different Devices Used to Visit"
        >
          <>
            <Box mt={4} height="265px">
              <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="donut"
                height={265}
                width={"100%"}
              />
            </Box>
            {/* points */}
            <Stack
              spacing={3}
              mt={3}
              direction="row"
              justifyContent="space-between"
            >
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
                  color="textSecondary"
                >
                  Current
                </Typography>
              </Stack>
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
                  color="textSecondary"
                >
                  Due
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  sx={{
                    width: 9,
                    height: 9,
                    bgcolor: info,
                    svg: { display: "none" },
                  }}
                ></Avatar>
                <Typography
                  variant="subtitle2"
                  fontSize="12px"
                  color="textSecondary"
                >
                  Overdue
                </Typography>
              </Stack>
            </Stack>
          </>
        </DashboardCard>
      )}
    </>
  );
};

export default OurVisitors;
