import { Navbar, Home, Resources, NOIs } from './components';
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router";

import theme from "./styles/theme";


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box component="main" sx={{ pt: 15 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Resources" element={<Resources />} />
          <Route path="/NOIs" element={<NOIs />} />
        </Routes>
      </Box>

    </ThemeProvider>

  );
};

export default App;