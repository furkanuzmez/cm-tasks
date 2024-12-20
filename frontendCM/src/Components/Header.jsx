import { Typography, Box, Divider, Grid2 } from "@mui/material";
import logo from "../assets/CM_Logo_Nav.svg"; // Adjust the path based on your file structure

const Header = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "20px 10px",
        backgroundImage: "linear-gradient(220deg, #d9ffd1 10%, #00AFC9 66%);",
        color: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Grid2
        container
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <Grid2 item>
          <Typography
            variant="h5"
            sx={{
              fontStyle: "italic",
            }}
          >
            Data Search
          </Typography>
        </Grid2>
        <Grid2 item>
          <img
            src={logo}
            alt="cm.Chemicals Logo"
            style={{
              height: "64px", // Adjust size as needed
              filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))",
            }}
          />
        </Grid2>
      </Grid2>
      <Divider
        sx={{
          margin: "10px auto",
          width: "90%",
          backgroundColor: "white",
        }}
      />
    </Box>
  );
};

export default Header;
