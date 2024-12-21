import { useEffect, useState } from "react";
import { Box } from "@mui/material";

const Main = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateHeights = () => {
      const header = document.getElementById("app-header");
      const footer = document.getElementById("app-footer");
      if (header) {
        setHeaderHeight(header.offsetHeight);
      }
      if (footer) {
        setFooterHeight(footer.offsetHeight);
      }
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => {
      window.removeEventListener("resize", updateHeights);
    };
  }, []);

  return (
    <Box
      component="main"
      sx={{
        mt: `${headerHeight}px`,
        mb: `${footerHeight}px`,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: `calc(100vh - ${headerHeight + footerHeight}px)`,
        overflow: "auto", // Allow content to scroll if necessary
      }}
    >
      {children}
    </Box>
  );
};

export default Main;
