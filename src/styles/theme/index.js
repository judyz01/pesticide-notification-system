import { createTheme } from "@mui/material/styles";

export const Colors = {
  primary: "#126701",
  secondary: "#34A853",
  background: "#fdf7ee",
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