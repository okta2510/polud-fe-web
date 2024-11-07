import React from "react";
import DashboardCard from "../../shared/DashboardCard";
import { Typography, Box, Avatar, Chip, Stack, Button } from "@mui/material";

const comments = [
  {
    imgSrc: "/images/profile/user-1.jpg",
    name: "James Anderson",
    color: "secondary",
    subtext:
      " Lorem Ipsum is simply dummy text of the printing and type setting industry.",
    date: "April 14, 2024",
  },
  {
    imgSrc: "/images/profile/user-2.jpg",
    name: "James Anderson",
    color: "success",
    subtext:
      " Lorem Ipsum is simply dummy text of the printing and type setting industry.",
    date: "April 14, 2024",
  },
  {
    imgSrc: "/images/profile/user-3.jpg",
    name: "James Anderson",
    color: "error",
    subtext:
      " Lorem Ipsum is simply dummy text of the printing and type setting industry.",
    date: "April 14, 2024",
  },
  {
    imgSrc: "/images/profile/user-4.jpg",
    name: "James Anderson",
    color: "primary",
    subtext:
      " Lorem Ipsum is simply dummy text of the printing and type setting industry.",
    date: "April 14, 2024",
  },
];

const RecentComments = () => {
  return (
    <DashboardCard
      title="Recent Comments"
      subtitle="Latest Comments on users from Material"
    >
      <Stack spacing={3}>
        {comments.map((comment, i) => (
          <Stack direction="row" spacing={3} key={i}>
            <Avatar
              src={comment.imgSrc}
              alt="user"
              sx={{ width: 50, height: 50 }}
            />
            <Box>
              <Stack direction="row" spacing={1}>
                <Typography variant="h6">{comment.name}</Typography>
                <Chip
                  sx={{
                    bgcolor: comment.color + ".light",
                    color: comment.color + ".main",
                    borderRadius: "8px",
                    height: "20px",
                    fontWeight: 400,
                    ".MuiChip-label": {
                      fontSize: "10px",
                    },
                  }}
                  size="small"
                  label="Pending"
                />
              </Stack>
              <Typography variant="subtitle2" fontSize="12px" mt={1}>
                {comment.subtext}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
              >
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{
                    backgroundColor: comment.color + ".main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: comment.color + ".main",
                    }
                  }}
                  size="small"
                >
                  Read More
                </Button>
                <Typography variant="subtitle2" fontSize="12px">
                  {comment.date}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        ))}
      </Stack>
    </DashboardCard>
  );
};

export default RecentComments;
