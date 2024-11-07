import {
  Box,
  CardContent,
  CardMedia,
  Card,
  Typography,
  Stack,
} from "@mui/material";
import { IconCloudBolt, IconCloudRain } from "@tabler/icons-react";

const WeatherCard = () => {
  return (
    <Card variant="outlined" sx={{ p: 0 }}>
      <CardMedia
        sx={{ height: 90 }}
        image="/images/backgrounds/weatherbg.jpg"
        title="green iguana"
      />
      <CardContent sx={{ py: 2 }}>
        <Stack direction="row" spacing={3} justifyContent="space-between">
          <Stack direction="row" spacing={2}>
            <Box color="primary.main">
              <IconCloudBolt width={40} height={40} />
            </Box>
            <Box>
              <Typography variant="h4">
                32<sup>0</sup>
              </Typography>
              <Typography variant="subtitle2">Sunny Rainy day</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Box color="secondary.main">
              <IconCloudRain width={40} height={40} />
            </Box>
            <Box>
              <Typography variant="h4">
                25<sup>0</sup>
              </Typography>
              <Typography variant="subtitle2">Tonight</Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
