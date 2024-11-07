import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, MenuItem, Box } from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import SktRevenueUpdates from "../skeleton/modern/SktRevenueUpdates";
import CustomSelect from "../../forms/theme-elements/CustomSelect";

interface RevenueupdatestwoCardProps {
  isLoading: boolean;
}

const RevenueUpdatesChart = ({ isLoading }: RevenueupdatestwoCardProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const [number, setNumber] = React.useState("1");

  const handleChange3 = (event: any) => {
    setNumber(event.target.value);
  };

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "line",
      foreColor: "#adb0bb",
      fontFamily: "inherit",
      height: 365,
      toolbar: {
        show: false,
      },
    },
    colors: [secondary, primary],

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
        <SktRevenueUpdates />
      ) : (
        <DashboardCard
          title="Revenue Updates" subtitle="Last month earnings"
          action={
            <CustomSelect
              id="standard-select-number"
              variant="outlined"
              value={number}
              onChange={handleChange3}
              sx={{
                mb: 2,
              }}
            >
              <MenuItem value={1}>March</MenuItem>
              <MenuItem value={2}>April</MenuItem>
              <MenuItem value={3}>June</MenuItem>
            </CustomSelect>
          }
        >
          <>
            <Box height="293px">
              <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="line"
                height={293}
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
                  Earning
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
                  Expense
                </Typography>
              </Stack>
            </Stack>
          </>
        </DashboardCard>
      )}
    </>
  );
};

export default RevenueUpdatesChart;
