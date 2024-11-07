import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Grid, Box } from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import SktSalesPrediction from "../skeleton/minimal/SktSalesPrediction";

interface SalesPredictionCardProps {
  isLoading: boolean;
}

const SalesPrediction = ({ isLoading }: SalesPredictionCardProps) => {
  // chart color
  const theme = useTheme();
  const info = theme.palette.info.main;

  // chart 1
  const totalRevenueChart: any = {
    colors: [info],
    chart: {
      type: "radialBar",
      offsetY: -20,
      foreColor: "#adb0bb",
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          shadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "22px",
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["Average Results"],
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      x: {
        show: false,
      },
    },
  };
  const totalRevenueseriesChart = [76];

  return (
    <>
      {isLoading ? (
        <SktSalesPrediction />
      ) : (
        <DashboardCard title="Sales Prediction">
          <>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Typography variant="h3">$3,528</Typography>
                <Typography variant="subtitle2" fontSize="10px">
                  10% Increased
                </Typography>
                <Typography variant="subtitle1" fontWeight={500}>
                  (150-165 Sales)
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box height="80px" mb={1}>
                  <Chart
                    options={totalRevenueChart}
                    series={totalRevenueseriesChart}
                    type="radialBar"
                    height={200}
                    width="150px"
                  />
                </Box>
              </Grid>
            </Grid>
          </>
        </DashboardCard>
      )}
    </>
  );
};

export default SalesPrediction;
