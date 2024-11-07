import React from "react";
import { Box, Skeleton, Stack, Card, CardContent, Grid } from "@mui/material";
import { IconChartDonutFilled } from "@tabler/icons-react";

const SktBandwidthUsage = () => {
  return (
    <Card variant="outlined" sx={{ p: 0, bgcolor: "primary.main" }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Box color="white">
            <IconChartDonutFilled width={30} height={30} />
          </Box>
          <Box>
            <Skeleton variant="rounded" width={160} height={25} />
            <Skeleton variant="rounded" width={160} height={25} />
          </Box>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={5} display="flex" alignItems="center">
            <Skeleton variant="rounded" width={100} height={25} />
          </Grid>
          <Grid item xs={7}>
            <Box height="70px">
              <Skeleton variant="rounded" width="100%" height={70} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SktBandwidthUsage;
