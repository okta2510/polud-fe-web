import {
  Box,
  CardContent,
  Card,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import { IconBasket } from "@tabler/icons-react";

const Purchases = () => {
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
            <Typography variant="h5">Purchases</Typography>
          </Box>
          <Avatar
            sx={{
              backgroundColor: "secondary.main",
              width: 48,
              height: 48,
            }}
          >
            <IconBasket width={24} />
          </Avatar>
        </Stack>

        <Typography variant="h5">
          2,367
        </Typography>
        <Typography variant="subtitle1">Monthly Sales</Typography>
      </CardContent>
    </Card>
  );
};

export default Purchases;
