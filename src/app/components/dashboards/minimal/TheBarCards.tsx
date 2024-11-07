import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Typography, CardContent } from "@mui/material";
import BlankCard from "../../shared/BlankCard";
import SktBarCards from "../skeleton/minimal/SktBarCards";

interface SktBarCards {
  isLoading: boolean;
}

const BarCards = ({ isLoading }: SktBarCards) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const error = theme.palette.error.main;
  const info = theme.palette.info.main;

  // chart 1
  const pie1Chart: any = {
    labels: ["New", "Old"],
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: { enabled: true },
    },
    colors: [secondary],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "flat",
        columnWidth: "65%",
        borderRadius: 3 
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
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      x: {
        show: false,
      },
    },
  };
  const pie1seriesChart = [
    {
      name: "",
      data: [4, 5, 2, 10, 9, 12, 4, 9],
    },
  ];

  // chart 2
  const pie2Chart: any = {
    labels: ["New", "Old"],
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: { enabled: true },
    },
    colors: [info],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "flat",
        columnWidth: "65%",
        borderRadius: 3 
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
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      x: {
        show: false,
      },
    },
  };
  const pie2seriesChart = [
    {
      name: "",
      data: [4, 5, 2, 10, 9, 12, 4, 9],
    },
  ];

  // chart 3
  const pie3Chart: any = {
    labels: ["New", "Old"],
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: { enabled: true },
    },
    colors: [primary],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "flat",
        columnWidth: "65%",
        borderRadius: 3 
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
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      x: {
        show: false,
      },
    },
  };
  const pie3seriesChart = [
    {
      name: "",
      data: [4, 5, 2, 10, 9, 12, 4, 9],
    },
  ];

  // chart 4
  const pie4Chart: any = {
    labels: ["New", "Old"],
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: { enabled: true },
    },
    colors: [error],
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "flat",
        columnWidth: "65%",
        borderRadius: 3 
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
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      x: {
        show: false,
      },
    },
  };
  const pie4seriesChart = [
    {
      name: "",
      data: [4, 5, 2, 10, 9, 12, 4, 9],
    },
  ];

  return (
    <>
      {isLoading ? (
        <SktBarCards />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <BlankCard>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontSize="16px"
                  textAlign="center"
                >
                  Unique Visit
                </Typography>

                <Box
                  height="70px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mt={1}
                >
                  <Chart
                    options={pie1Chart}
                    series={pie1seriesChart}
                    type="bar"
                    height={65}
                    width="90px"
                  />
                </Box>
                <Typography variant="h6" textAlign="center" mt={2}>
                  12,456
                </Typography>
              </CardContent>
            </BlankCard>
          </Grid>
          {/* 2 */}
          <Grid item xs={12} sm={6} lg={3}>
            <BlankCard>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontSize="16px"
                  textAlign="center"
                >
                  Total Visit
                </Typography>

                <Box
                  height="70px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mt={1}
                >
                  <Chart
                    options={pie2Chart}
                    series={pie2seriesChart}
                    type="bar"
                    height={65}
                    width="90px"
                  />
                </Box>
                <Typography variant="h6" textAlign="center" mt={2}>
                  6,450
                </Typography>
              </CardContent>
            </BlankCard>
          </Grid>
          {/* 3 */}
          <Grid item xs={12} sm={6} lg={3}>
            <BlankCard>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontSize="16px"
                  textAlign="center"
                >
                  Bounce rate
                </Typography>

                <Box
                  height="70px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mt={1}
                >
                  <Chart
                    options={pie3Chart}
                    series={pie3seriesChart}
                    type="bar"
                    height={65}
                    width="90px"
                  />
                </Box>
                <Typography variant="h6" textAlign="center" mt={2}>
                  45,125
                </Typography>
              </CardContent>
            </BlankCard>
          </Grid>
          {/* 4 */}
          <Grid item xs={12} sm={6} lg={3}>
            <BlankCard>
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontSize="16px"
                  textAlign="center"
                >
                  Unique Visit
                </Typography>

                <Box
                  height="70px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mt={1}
                >
                  <Chart
                    options={pie4Chart}
                    series={pie4seriesChart}
                    type="bar"
                    height={65}
                    width="90px"
                  />
                </Box>
                <Typography variant="h6" textAlign="center" mt={2}>
                  1,520
                </Typography>
              </CardContent>
            </BlankCard>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default BarCards;
