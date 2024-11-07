import React from "react";
import { Typography, Box, Divider, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";
import DashboardCard from "../../shared/DashboardCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import CustomSelect from "../../forms/theme-elements/CustomSelect";
import { IconShoppingCart } from "@tabler/icons-react";
import SktTotalSales from "../skeleton/modern/SktTotalSales";

interface RevenueupdatestwoCardProps {
  isLoading: boolean;
}

const TotalSales = ({ isLoading }: RevenueupdatestwoCardProps) => {
  const [number, setNumber] = React.useState("1");

  const handleChange3 = (event: any) => {
    setNumber(event.target.value);
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const warning = theme.palette.warning.main;
  const grey = theme.palette.grey.A100;
  const optionstotalsales: any = {
    labels: ["2021", "2020", "2019"],

    chart: {
      height: 280,
      type: "donut",
      foreColor: "#adb0bb",
      fontFamily: "inherit",
    },
    colors: [primary, secondary, grey],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      colors: ["transparent"],
    },
    plotOptions: {
      pie: {
        donut: {
          size: "78%",
          background: "transparent",
          labels: {
            show: false,
            name: {
              show: true,
              fontSize: "18px",
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: false,
              color: "#98aab4",
            },
            total: {
              show: false,
              label: "Our Visitors",
              color: "#98aab4",
            },
          },
        },
      },
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };
  const seriestotalsales = [25, 35, 35];
  return (
    <>
      {isLoading ? (
        <SktTotalSales />
      ) : (
        <DashboardCard
          title="Total Sales"
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
            <Box display="flex" alignItems="center" mt={4}>
              <Typography color="textSecondary" variant="body1">
                Sales Yearly
              </Typography>
              <Box
                sx={{
                  ml: "auto", 
                }}
              >
                <Typography variant="h3">8,364,398</Typography>
              </Box>
            </Box>
            {/* chart */}
            <Box mt={5} position="relative" height="265px">
              <Chart
                options={optionstotalsales}
                series={seriestotalsales}
                type="donut"
                height={265}
                width={"100%"}
              />
              <Typography
                color="grey.500"
                sx={{
                  position: "absolute",
                  left: "46%",
                  top: "45%",
                }}
              >
                <IconShoppingCart width={28} />
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              sx={{
                mt: 5,
              }}
            >
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    backgroundColor: primary,
                    borderRadius: "50%",
                    height: 8,
                    width: 8,
                    mr: 1,
                  }}
                />
                <Typography color="textSecondary" variant="subtitle1">
                  2021
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    backgroundColor: secondary,
                    borderRadius: "50%",
                    height: 8,
                    width: 8,
                    mr: 1,
                  }}
                />
                <Typography color="textSecondary" variant="subtitle1">
                  2020
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    backgroundColor: warning,
                    borderRadius: "50%",
                    height: 8,
                    width: 8,
                    mr: 1,
                  }}
                />
                <Typography color="textSecondary" variant="subtitle1">
                  2019
                </Typography>
              </Box>
            </Box>
          </>
        </DashboardCard>
      )}
    </>
  );
};

export default TotalSales;
