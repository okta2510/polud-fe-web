import { Box, CardContent, Card, Typography, Stack, Grid } from "@mui/material";
import { IconChartDonutFilled } from "@tabler/icons-react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import SktBandwidthUsage from "../skeleton/analytical/SktBandwidthUsage";

interface SktBandwidthUsagetwoCardProps {
  isLoading: boolean;
}

const BandwidthUsage = ({ isLoading }: SktBandwidthUsagetwoCardProps) => {
  const theme = useTheme();
  // chart
  const optionscolumnchart: any = {
    colors: ["#fff"],
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: "rgba(255, 255, 255, 0.5)",
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: "",
      data: [5, 0, 12, 1, 8, 3, 12, 15],
    },
  ];

  return (
    <>
      {isLoading ? (
        <SktBandwidthUsage />
      ) : (
        <Card variant="outlined" sx={{ p: 0, bgcolor: "primary.main" }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
              <Box color="white">
                <IconChartDonutFilled width={30} height={30} />
              </Box>
              <Box>
                <Typography color="white" variant="h5">
                  Bandwidth usage
                </Typography>
                <Typography color="white" variant="subtitle1">
                  March 2024
                </Typography>
              </Box>
            </Stack>
            <Grid container spacing={3}>
              <Grid item xs={5} display="flex" alignItems="center">
                <Typography variant="h5" fontWeight="400" color="white">
                  50 GB
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Box height="70px">
                  <Chart
                    options={optionscolumnchart}
                    series={seriescolumnchart}
                    type="line"
                    height={70}
                    width={"100%"}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default BandwidthUsage;
