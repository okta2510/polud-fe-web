import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import SktSalesCard from "../skeleton/ecommerce/SktSalesCard";

interface SalesCardProps {
  isLoading: boolean;
}

const SalesCards = ({ isLoading }: SalesCardProps) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const error = theme.palette.error.main;
  const info = theme.palette.info.main;

  // chart 1
  const pie1Chart: any = {
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: { enabled: true },
      fontFamily: "inherit",
    },
    colors: [secondary],
    fill: {
      type: "solid",
      opacity: 1,
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "flat",
        columnWidth: "50%",
      },
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    stroke: {
      curve: "straight",
      width: 0,
    },
    tooltip: {
      x: {
        show: false,
      },
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };
  const pie1seriesChart = [
    {
      name: "A Sales",
      data: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
    },
  ];

  // chart 2
  const pie2Chart: any = {
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: { enabled: true },
      fontFamily: "inherit",
    },
    colors: [primary],
    fill: {
      type: "solid",
      opacity: 1,
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "flat",
        columnWidth: "50%",
      },
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    stroke: {
      curve: "straight",
      width: 0,
    },
    tooltip: {
      x: {
        show: false,
      },
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };
  const pie2seriesChart = [
    {
      name: "B Sales",
      data: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
    },
  ];

  // chart 3
  const pie3Chart: any = {
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: { enabled: true },
      fontFamily: "inherit",
    },
    colors: [info],
    fill: {
      type: "solid",
      opacity: 1,
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "flat",
        columnWidth: "50%",
      },
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    stroke: {
      curve: "straight",
      width: 0,
    },
    tooltip: {
      x: {
        show: false,
      },
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };
  const pie3seriesChart = [
    {
      name: "C Sales",
      data: [2, 4, 4, 6, 8, 5, 6, 4, 8, 6, 6, 2],
    },
  ];

  return (
    <>
      {isLoading ? (
        <SktSalesCard />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={4}>
            <DashboardCard
              title="Product A Sales"
              footer={
                <Box height="50px" mt={1}>
                  <Chart
                    options={pie1Chart}
                    series={pie1seriesChart}
                    type="area"
                    height={50}
                    width={"100%"}
                  />
                </Box>
              }
            >
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Typography variant="subtitle2" fontSize="12px">
                    Monthly
                  </Typography>
                  <Typography variant="h6">80.40%</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle2" fontSize="12px">
                    Daily
                  </Typography>
                  <Typography variant="h6">20.40%</Typography>
                </Grid>
              </Grid>
            </DashboardCard>
          </Grid>
          {/* 2 */}
          <Grid item xs={12} sm={6} lg={4}>
            <DashboardCard
              title="Product B Sales"
              footer={
                <Box height="50px" mt={1}>
                  <Chart
                    options={pie2Chart}
                    series={pie2seriesChart}
                    type="area"
                    height={50}
                    width={"100%"}
                  />
                </Box>
              }
            >
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Typography variant="subtitle2" fontSize="12px">
                    Monthly
                  </Typography>
                  <Typography variant="h6">80.40%</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle2" fontSize="12px">
                    Daily
                  </Typography>
                  <Typography variant="h6">20.40%</Typography>
                </Grid>
              </Grid>
            </DashboardCard>
          </Grid>
          {/* 3 */}
          <Grid item xs={12} sm={6} lg={4}>
            <DashboardCard
              title="Product C Sales"
              footer={
                <Box height="50px" mt={1}>
                  <Chart
                    options={pie3Chart}
                    series={pie3seriesChart}
                    type="area"
                    height={50}
                    width={"100%"}
                  />
                </Box>
              }
            >
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <Typography variant="subtitle2" fontSize="12px">
                    Monthly
                  </Typography>
                  <Typography variant="h6">80.40%</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle2" fontSize="12px">
                    Daily
                  </Typography>
                  <Typography variant="h6">20.40%</Typography>
                </Grid>
              </Grid>
            </DashboardCard>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default SalesCards;
