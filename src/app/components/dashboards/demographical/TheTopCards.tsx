import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Box, Card, CardContent, Grid, Typography, Stack } from "@mui/material";

const TopCards = () => {
  
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const error = theme.palette.error.main;
  const warning = theme.palette.warning.main;

  // chart 1
  const pie1Chart: any = {
    labels: ["New", "Old"],
    chart: {},
    colors: [primary, "rgba(0, 0, 0, 0.1)"],
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: "85px",
        },
      },
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  };
  const pie1seriesChart = [5, 15];

  // chart 2
  const pie2Chart: any = {
    labels: ["New", "Old"],
    chart: {},
    colors: [secondary, "rgba(0, 0, 0, 0.1)"],
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: "85px",
        },
      },
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  };
  const pie2seriesChart = [4, 15];

  // chart 3
  const pie3Chart: any = {
    labels: ["New", "Old"],
    chart: {},
    colors: [error, "rgba(0, 0, 0, 0.1)"],
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: "85px",
        },
      },
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  };
  const pie3seriesChart = [11, 15];

  // chart 4
  const pie4Chart: any = {
    labels: ["New", "Old"],
    chart: {},
    colors: [warning, "rgba(0, 0, 0, 0.1)"],
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: "85px",
        },
      },
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
      },
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  };
  const pie4seriesChart = [20, 15];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} lg={3}>
        <Card variant="outlined" sx={{ p: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box py={3} pl={3}>
                <Typography variant="h4">$324</Typography>
                <Typography variant="subtitle1">New Clients</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                height="70px"
                display="flex"
                alignItems="center"
                justifyContent="center" mt={1}
              >
                <Chart
                  options={pie1Chart}
                  series={pie1seriesChart}
                  type="donut"
                  height={70}
                  width="70px"
                />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {/* 2 */}
      <Grid item xs={12} sm={6} lg={3}>
        <Card variant="outlined" sx={{ p: 0 }}>
        <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box py={3} pl={3}>
                <Typography variant="h4">$2,376</Typography>
                <Typography variant="subtitle1">Total Visits</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                height="70px"
                display="flex"
                alignItems="center"
                justifyContent="center" mt={1}
              >
                <Chart
                  options={pie2Chart}
                  series={pie2seriesChart}
                  type="donut"
                  height={70}
                  width="70px"
                />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {/* 3 */}
      <Grid item xs={12} sm={6} lg={3}>
        <Card variant="outlined" sx={{ p: 0 }}>
        <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box py={3} pl={3}>
                <Typography variant="h4">$1,745</Typography>
                <Typography variant="subtitle1">New Leads</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                height="70px"
                display="flex"
                alignItems="center"
                justifyContent="center" mt={1}
              >
                <Chart
                  options={pie3Chart}
                  series={pie3seriesChart}
                  type="donut"
                  height={70}
                  width="70px"
                />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {/* 4 */}
      <Grid item xs={12} sm={6} lg={3}>
        <Card variant="outlined" sx={{ p: 0 }}>
        <Grid container spacing={3}>
            <Grid item xs={6}>
              <Box py={3} pl={3}>
                <Typography variant="h4">$6,125</Typography>
                <Typography variant="subtitle1">Page Views</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                height="70px"
                display="flex"
                alignItems="center"
                justifyContent="center" mt={1}
              >
                <Chart
                  options={pie4Chart}
                  series={pie4seriesChart}
                  type="donut"
                  height={70}
                  width="70px"
                />
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TopCards;
