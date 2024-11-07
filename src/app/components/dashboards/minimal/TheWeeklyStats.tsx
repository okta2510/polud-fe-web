import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import {
  Stack,
  Typography,
  Avatar,
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import {
  IconMessageDots,
  IconShoppingCart,
  IconStar,
  IconDots,
} from "@tabler/icons-react";
import SktWeeklyStats from "../skeleton/minimal/SktWeeklyStats";

interface WeeklyCardProps {
  isLoading: boolean;
}

const options = ["Action", "Another Action", "Something else here"];

const WeeklyStats = ({ isLoading }: WeeklyCardProps) => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const success = theme.palette.success.main;
  const warning = theme.palette.warning.main;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 130,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: [secondary],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0,
        stops: [20, 180],
      },
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      x: {
        show: false,
      },
    },
  };
  const seriescolumnchart = [
    {
      name: "Weekly Stats",
      color: secondary,
      data: [5, 15, 5, 10, 5],
    },
  ];

  const stats = [
    {
      title: "Top Sales",
      subtitle: "Johnathan Doe",
      percent: "68",
      color: primary,
      icon: <IconShoppingCart width={18} />,
    },
    {
      title: "Best Seller",
      subtitle: "Footware",
      percent: "45",
      color: warning,
      icon: <IconStar width={18} />,
    },
    {
      title: "Most Commented",
      subtitle: "Fashionware",
      percent: "14",
      color: success,
      icon: <IconMessageDots width={18} />,
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SktWeeklyStats />
      ) : (
        <DashboardCard
          title="Weekly Stats"
          action={
            <Box>
              <Tooltip title="Action">
                <IconButton
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  size="small"
                  aria-label="action"
                >
                  <IconDots width={20} />
                </IconButton>
              </Tooltip>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={handleClose}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }
          footer={
            <Stack mt={4}>
              <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="area"
                height={130}
                width={"100%"}
              />
            </Stack>
          }
        >
          <>
            <Stack spacing={3} mt={3}>
              {stats.map((stat, i) => (
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                  alignItems="center"
                  key={i}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      sx={{
                        bgcolor: stat.color,
                        width: 40,
                        height: 40,
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" mb="4px">
                        {stat.title}
                      </Typography>
                      <Typography variant="subtitle2" color="textSecondary">
                        {stat.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                  <Avatar
                    sx={{
                      bgcolor: "grey.200",
                      width: 42,
                      height: 24,
                      borderRadius: "4px",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      fontWeight="600"
                    >
                      +{stat.percent}
                    </Typography>
                  </Avatar>
                </Stack>
              ))}
            </Stack>
          </>
        </DashboardCard>
      )}
    </>
  );
};

export default WeeklyStats;
