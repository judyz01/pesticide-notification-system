import * as React from "react";
import { Suspense } from "react";

import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router";

import { Footer, Home, Navbar, NOIs, Resources} from './components';
import theme from "./styles/theme";


const App = () => {
  const [location, setLocation] = React.useState();

  const set_location = (location) => {
    setLocation(location);
  }

  return (
    <Suspense fallback="loading">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Box component="main" sx={{ pt: 15 }}>
          <Routes>
            <Route path="/" element={<Home set_location={set_location} />} />
            <Route path="/Resources" element={<Resources />} />
            <Route path="/NOIs" element={<NOIs location={location}/>} />
          </Routes>
        </Box>
        <Footer />
      </ThemeProvider>
    </Suspense>
  );
};

export default App;