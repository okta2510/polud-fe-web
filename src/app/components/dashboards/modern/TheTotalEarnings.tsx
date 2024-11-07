import {
  Box,
  CardContent,
  Card,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import { IconCurrencyDollar } from "@tabler/icons-react";

const TotalEarnings = () => {
  return (
    <Card variant="outlined" sx={{ p: 0 }}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={2}
          mb={4}
        >
          <Box>
            <Typography variant="h5">Total Earnings</Typography>
          </Box>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              width: 48,
              height: 48,
            }}
          >
            <IconCurrencyDollar width={24} />
          </Avatar>
        </Stack>

        <Typography variant="h5">$93,438.78</Typography>
        <Typography variant="subtitle1">Monthly Revenue</Typography>
      </CardContent>
    </Card>
  );
};

export default TotalEarnings;
