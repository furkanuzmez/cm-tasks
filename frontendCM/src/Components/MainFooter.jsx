// src/components/Footer.js
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            id="app-footer" // Unique ID for the footer
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: theme => theme.palette.background.paper,
                color: theme => theme.palette.text.secondary,
                py: 2,
                textAlign: 'center',
                borderTop: `1px solid rgba(0, 0, 0, 0.12)`,
            }}
        >
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} Carbon-Minds. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
