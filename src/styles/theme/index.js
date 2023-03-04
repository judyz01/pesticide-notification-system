import { createTheme } from "@mui/material/styles";

export const Colors = {
  primary: "#126701", // Dark Green
  secondary: "#34A853", // Light Green
  background: "#fdf7ee", // Homepage background color
}

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
    background: {
      default: Colors.background,
    },
  }
});

export default theme;