import { Box, CardContent, Card, Typography, Stack, Grid } from "@mui/material";
import { IconChartDonutFilled } from "@tabler/icons-react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import SktBandwidthUsage from "../skeleton/analytical/SktBandwidthUsage";

interface SktBandwidthUsagetwoCardProps {
  isLoading: boolean;
}

const DownloadCount = ({ isLoading }: SktBandwidthUsagetwoCardProps) => {
  const theme = useTheme();
  // chart
  const optionscolumnchart: any = {
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "20%",
      },
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    colors: "rgba(255, 255, 255, 0.5)",
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
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: "",
      data: [4, 5, 2, 10, 9, 12, 4, 9, 4, 5, 3, 10, 9, 12, 10, 9, 12, 4, 9],
    },
  ];

  return (
    <>
      {isLoading ? (
        <SktBandwidthUsage />
      ) : (
        <Card variant="outlined" sx={{ p: 0, bgcolor: "secondary.main" }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
              <Box color="white">
                <IconChartDonutFilled width={30} height={30} color="white" />
              </Box>
              <Box>
                <Typography color="white" variant="h5">
                  Download Count
                </Typography>
                <Typography color="white" variant="subtitle1">
                  March 2024
                </Typography>
              </Box>
            </Stack>
            <Grid container spacing={3}>
              <Grid item xs={5} display="flex" alignItems="center">
                <Typography variant="h5" fontWeight="400" color="white">
                  3,487
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Box height="70px">
                <Chart
                  options={optionscolumnchart}
                  series={seriescolumnchart}
                  type="bar"
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

export default DownloadCount;
