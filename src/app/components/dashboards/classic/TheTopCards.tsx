import Image from "next/image";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";

import {
  IconActivity,
  IconAnchor,
  IconDeviceDesktop,
  IconShoppingCart,
} from "@tabler/icons-react";

const topcards = [
  {
    icon: <IconActivity width={22} />,
    title: "Total Revenue",
    digits: "3,249",
    bgcolor: "primary.main",
  },
  {
    icon: <IconDeviceDesktop width={22} />,
    title: "Online Revenue",
    digits: "2,376",
    bgcolor: "warning.main",
  },
  {
    icon: <IconShoppingCart width={22} />,
    title: "Offline Revenue",
    digits: "1,795",
    bgcolor: "secondary.main",
  },
  {
    icon: <IconAnchor width={22} />,
    title: "Ad. Expense",
    digits: "687",
    bgcolor: "error.main",
  },
];

const TopCards = () => {
  return (
    <Grid container spacing={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={6} lg={3} key={i}>
          <Card variant="outlined" sx={{ p: 0 }}>
            <CardContent>
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: topcard.bgcolor,
                  }}
                >
                  {topcard.icon}
                </Avatar>
                <Box>
                  <Typography variant="h4">${topcard.digits}</Typography>
                  <Typography variant="subtitle1">{topcard.title}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
