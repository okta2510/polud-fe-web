import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
// images
import mainDemo from "/public/images/landingpage/demos/demo-main.jpg";
import darkDemo from "/public/images/landingpage/demos/demo-dark.jpg";
import horizontalDemo from "/public/images/landingpage/demos/demo-horizontal.jpg";
import rtlDemo from "/public/images/landingpage/demos/demo-rtl.jpg";
import minisidebarDemo from "/public/images/landingpage/demos/demo-minisidebar.jpg";

import app1 from "/public/images/landingpage/apps/app-calendar.jpg";
import app2 from "/public/images/landingpage/apps/app-chat.jpg";
import app3 from "/public/images/landingpage/apps/app-contact.jpg";
import app4 from "/public/images/landingpage/apps/app-email.jpg";
import app5 from "/public/images/landingpage/apps/app-note.jpg";
import app6 from "/public/images/landingpage/apps/app-user-profile.jpg";
import app7 from "/public/images/landingpage/apps/app-blog.jpg";
import app8 from "/public/images/landingpage/apps/app-ticket.jpg";
import app9 from "/public/images/landingpage/apps/app-ecommerce-shop.jpg";
import app11 from "/public/images/landingpage/apps/app-ecommerce-checkout.jpg";
import app12 from "/public/images/landingpage/apps/app-ecommerce-list.jpg";

import DemoTitle from "./DemoTitle";
import Image from "next/image";

interface sliderData {
  avatar: string | any;
  link: string;
  demo: string;
  applink?: boolean;
}

interface DemoTypes {
  link: string;
  img: string | any;
  title: string;
}

const demos: DemoTypes[] = [
  {
    link: "https://materialpro-nextjs-pro.vercel.app/",
    img: mainDemo,
    title: "Main",
  },
  {
    link: "https://materialpro-nextjs-dark.vercel.app/dashboards/classic",
    img: darkDemo,
    title: "Dark",
  },
  {
    link: "https://materialpro-nextjs-horizontal.vercel.app/dashboards/demographical",
    img: horizontalDemo,
    title: "Horizontal",
  },
  {
    link: "/",
    img: rtlDemo,
    title: "RTL-[included with package]",
  },
  {
    link: "/",
    img: minisidebarDemo,
    title: "Minisidebar-[included with package]",
  },
];

const apps: DemoTypes[] = [
  {
    link: "https://materialpro-nextjs-pro.vercel.app/apps/calendar",
    img: app1,
    title: "Calendar App",
  },
  {
    link: "https://materialpro-nextjs-pro.vercel.app/apps/chats",
    img: app2,
    title: "Chat App",
  },
  {
    link: "https://materialpro-nextjs-pro.vercel.app/apps/contacts",
    img: app3,
    title: "Contact App",
  },
  {
    link: "https://materialpro-nextjs-pro.vercel.app/apps/email",
    img: app4,
    title: "Email App",
  },
  {
    link: "https://materialpro-nextjs-pro.vercel.app/apps/notes",
    img: app5,
    title: "Note App",
  },
  {
    link: "https://materialpro-nextjs-pro.vercel.app/apps/user-profile/profile",
    img: app6,
    title: "User Profile App",
  },
  {
    link: "https://materialpro-nextjs-pro.vercel.app/apps/blog/post",
    img: app7,
    title: "Blog App",
  },
  {
    link: "https://materialpro-nextjs-pro.vercel.app/apps/tickets",
    img: app8,
    title: "Ticket App",
  },
  {
    link: "https://materialpro-nextjs-pro.vercel.app/apps/ecommerce/shop",
    img: app9,
    title: "eCommerce Shop App",
  },
  {
    link: "https://materialpro-nextjs-pro.vercel.app/apps/ecommerce/checkout",
    img: app11,
    title: "eCommerce Checkout App",
  },
  {
    link: "https://materialpro-nextjs-pro.vercel.app/apps/ecommerce/list",
    img: app12,
    title: "eCommerce List App",
  },
];

const StyledBox = styled(Box)(() => ({
  overflow: "auto",
  position: "relative",
  ".MuiButton-root": {
    display: "none",
  },
  "&:hover": {
    ".MuiButton-root": {
      display: "block",
      transform: "translate(-50%,-50%)",
      position: "absolute",
      left: "50%",
      right: "50%",
      top: "50%",
      minWidth: "100px",
      zIndex: "9",
    },
    "&:before": {
      content: '""',
      position: "absolute",
      top: "0",
      left: " 0",
      width: "100%",
      height: "100%",
      zIndex: "8",
      backgroundColor: "rgba(55,114,255,.2)",
    },
  },
}));

const DemoSlider = () => {
  return (
    <Box id="demos"
      pb="140px"
      overflow="hidden"
      sx={{
        pt: {
          sm: "60px",
          lg: "0",
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <DemoTitle />

        {/* demos */}
        <Box mt={9}>
          <Grid container mt={2} spacing={3} justifyContent="center">
            {demos.map((demo, index) => (
              <Grid item xs={12} lg={3} key={index}>
                <Box>
                  <StyledBox>
                    <Image
                      src={demo.img}
                      alt="demo"
                      style={{
                        borderRadius: "8px",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      href={demo.link}
                      target="_blank"
                    >
                      Live Preview
                    </Button>
                  </StyledBox>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    textAlign="center"
                    fontWeight={500}
                    mt={2}
                  >
                    {demo.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mb={2} mt={5} textAlign="center">
          <Chip label="Apps" color="primary" />
        </Box>
        {/* apps */}
        <Box>
          <Grid container mt={2} spacing={3}>
            {apps.map((app, index) => (
              <Grid item xs={12} lg={3} key={index}>
                <Box>
                  <StyledBox>
                    <Image
                      src={app.img}
                      alt="app"
                      style={{
                        borderRadius: "8px",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      href={app.link}
                      target="_blank"
                    >
                      Live Preview
                    </Button>
                  </StyledBox>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    textAlign="center"
                    fontWeight={500}
                    mt={2}
                  >
                    {app.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default DemoSlider;
