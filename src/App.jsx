import * as React from "react";
import { Suspense } from "react";
import { Navbar, Home, Resources, NOIs, Footer } from './components';
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router";

import theme from "./styles/theme";


const App = () => {


  const [location, setLocation] = React.useState();

  const set_location = (location) => {
    console.log("APP: " + location.lat);
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