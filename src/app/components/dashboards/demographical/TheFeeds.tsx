import React from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Badge,
} from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";

const contacts = [
  {
    img: "/images/profile/user-1.jpg",
    title: "You have 4 pending tasks",
    subtext: "To: Pawan deep",
    status: "primary.main",
  },
  {
    img: "/images/profile/user-2.jpg",
    title: "Server #1 overloaded",
    subtext: "To: pamela",
    status: "secondary.main",
  },
  {
    img: "/images/profile/user-3.jpg",
    title: "New order received.",
    subtext: "To: Arijit.com",
    status: "error.main",
  },
  {
    img: "/images/profile/user-4.jpg",
    title: "New user registered",
    subtext: "To: kat@gmail.com",
    status: "warning.main",
  },
];

const Feeds = () => {
  return (
    <DashboardCard
      title="Feeds"
      subtitle="Checkout the new feeds"
      footer={
        <>
          <Box mt="-47px">
            <List>
              {contacts.map((contact, i) => (
                <ListItem key={i} disableGutters sx={{ p: 0 }}>
                  <ListItemButton sx={{ px: 4, py: 2 }}>
                    <ListItemAvatar>
                      <Badge
                        variant="dot"
                        sx={{
                          ".MuiBadge-badge": {
                            backgroundColor: contact.status,
                          },
                        }}
                      >
                        <Avatar src={contact.img} alt="user-1" />
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={contact.title}
                      primaryTypographyProps={{
                        fontSize: "16px",
                        fontWeight: 500,
                      }}
                      secondary={contact.subtext}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      }
    ></DashboardCard>
  );
};

export default Feeds;
