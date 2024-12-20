import { createTheme } from "@mui/material/styles";

const baseTheme = {
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#4A90E2", // Soft sky blue
    },
    secondary: {
      main: "#FF6F61", // Coral pink
    },
    background: {
      default: "#FAFAFA", // Light gray
      paper: "#FFFFFF", // Warmer white
    },
    text: {
      primary: "#212121", // Dark gray
      secondary: "#616161", // Medium gray
    },
    success: {
      main: "#4CAF50", // Fresh green
    },
    warning: {
      main: "#FFC107", // Golden yellow
    },
    error: {
      main: "#F44336", // Rosy red
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#1E88E5", // Deep blue
    },
    secondary: {
      main: "#D81B60", // Vivid magenta
    },
    background: {
      default: "#121212", // Near black
      paper: "#1E1E1E", // Dark charcoal
    },
    text: {
      primary: "#E0E0E0", // Off-white
      secondary: "#9E9E9E", // Cool gray
    },
    success: {
      main: "#66BB6A", // Soft green
    },
    warning: {
      main: "#FFB300", // Amber gold
    },
    error: {
      main: "#E53935", // Burnt red
    },
  },
});
