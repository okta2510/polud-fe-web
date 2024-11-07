import {
  Box,
  CardContent,
  Card,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import { IconCurrencyDollar } from "@tabler/icons-react";

const Earnings = () => {
  return (
    <Card variant="outlined" sx={{ p: 0, bgcolor: "primary.main" }}>
      <CardContent>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={2}
          mb={4}
        >
          <Box>
            <Typography color="white" variant="h5">
              Earnings
            </Typography>
          </Box>
          <Avatar
            sx={{
              backgroundColor: "secondary.main",
              width: 48,
              height: 48,
            }}
          >
            <IconCurrencyDollar width={20} />
          </Avatar>
        </Stack>

        <Typography variant="h5" color="white" fontWeight={400}>
          $93,438.78
        </Typography>
        <Typography variant="subtitle1" color="white">
          Monthly revenue
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Earnings;
