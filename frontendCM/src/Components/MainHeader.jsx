// src/components/Header.js

import { AppBar, Toolbar, Typography, Button,Box,Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import { LightMode, DarkMode } from "@mui/icons-material";


const Header = ({ toggleTheme, darkMode }) => {
   

    
    return (
        <AppBar
            position="fixed"
            id="app-header"
            color="text.primary"
            sx={{
                top: 0,
                left: 0,
                right: 0,
                zIndex: theme => theme.zIndex.drawer + 1,
                backgroundColor: "background.paper", backgroundImage: "none !important",
               
                
            }}
        >
            <Toolbar>
                <Typography variant="h8" sx={{ flexGrow: 1 }}>
                    Carbon Minds
                </Typography>
                <Button color="inherit" component={Link} to="/dataSearch">
                    Data Search
                </Button>
                <div style={{backgroundColor:"background.paper !important"}}>
                <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              zIndex: "9999",
              backgroundColor: "background.paper",
              color: "text.primary",
              position: "relative",
            }}
          >
            <Box
              sx={{
                
                top: 16,
                right: 16,
                display: "flex",
                alignItems: "center",
                backgroundColor: "background.paper",
              }}
            >
              <LightMode fontSize="small" />
              <Switch
                checked={darkMode}
                onChange={toggleTheme}
                color="default"
                sx={{backgroundColor: "background.paper", backGround:"background.paper",
                  mx: 1,
                  "& .MuiSwitch-switchBase": {
                    color: darkMode ? "#fff" : "#111",
                  },
                  "& .MuiSwitch-thumb": {
                    backgroundColor: darkMode ? "#000" : "#fdd835",
                  },
                }}
              />
              <DarkMode fontSize="small" />
            </Box>
          </Box>
                </div>
           
          
            </Toolbar>
        </AppBar>
    );
};

export default Header;
