import {
  CardContent,
  Card,
  Typography,
  Stack,
  Box,
  Button,
} from "@mui/material";
import { IconArrowUpLeft } from "@tabler/icons-react";
import Image from "next/image";

import bgImg from "/public/images/profile/businessmen.png";

const CongratulationsCard = () => {
  return (
    <Card variant="outlined" sx={{ p: 0, position: "relative" }}>
      <CardContent>
        <Typography variant="h5">Congratulation Julia</Typography>

        <Stack mt={2} mb={3} direction="row" alignItems="center" spacing={1}>
          <Typography variant="h5">$39,358</Typography>

          <Typography variant="subtitle1" display="flex">
            <Box display="flex" alignItems="center">
              <IconArrowUpLeft width={18} height={18} />
            </Box>
            +9%
          </Typography>
        </Stack>

        <Button variant="contained" color="primary">
          Download
        </Button>

        <Image src={bgImg} alt="businessmen" className="card-img-bg" height={250} width={170} />
      </CardContent>
    </Card>
  );
};

export default CongratulationsCard;
