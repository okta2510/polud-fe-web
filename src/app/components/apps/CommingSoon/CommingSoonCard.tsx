import Image from "next/image";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
const CommingSoon = () => {
    const router = useRouter();
    const title = "Hang Tight, We're Building\nSomething Awesome! 🚧✨";
    const subTitle = "Thank you for being patient.\nWe are doing some work on the site and will be back shortly.";
    return (
        <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            justifyContent="center"
        >
            <Container maxWidth="md">
                <Box mb={6} />
                <Image
                    src={"/images/backgrounds/maintenance1.svg"}
                    alt="404" width={360} height={360}
                    style={{ width: "100%", maxWidth: "500px", maxHeight: "500px" }}
                    priority={true}
                />
                <Box mb={4} />
                <Typography
                    style={{
                        whiteSpace: 'pre-line',
                        color: '#3A4752',
                        fontSize: '28px',
                        fontWeight: '600',
                        lineHeight: '42px'
                    }}
                    align="center"
                    mb={3}
                >
                    {title}
                </Typography>
                <Box mb={3} />
                <Typography
                    style={{
                        whiteSpace: 'pre-line',
                        color: '#99ABB4',
                        fontSize: '20px',
                        fontWeight: '400'
                    }}
                    align="center"
                    mb={3}
                >
                    {subTitle}
                </Typography>
                {/* <Button
                    onClick={() => router.back()}
                    color="primary"
                    variant="contained"
                    disableElevation
                >
                    Go Back
                </Button> */}
                <Box mb={6} />
            </Container>
        </Box>
    );
};

export default CommingSoon;