import * as React from "react";
import { Suspense } from "react";

import { Box, CssBaseline, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router";
import { useSearchParams } from "react-router-dom";

import { Footer, Home, Navbar, NOIs, Resources} from './components';
import theme from "./styles/theme";
import CookieConsent from "react-cookie-consent";

const App = () => {
  const [location, setLocation] = React.useState();

  const set_location = (location) => {
    setLocation(location);
  }

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Suspense fallback="loading...">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Box component="main" sx={{ pt: 15 }}>
          <Routes>
            <Route path="/" element={<Home set_location={set_location} lat={searchParams.get("lat")} lng={searchParams.get("lng")}/>} />
            <Route path="/Resources" element={<Resources />} />
            <Route path="/Archive" element={<NOIs location={location}/>} />
          </Routes>
          <CookieConsent
            flipButtons
            enableDeclineButton
            onDecline={() => {
              alert("This may impact your ability to use the tool!");
            }}
            style={{ background: "#126701" }}
            buttonStyle={{ color: "#4e503b", fontSize: "16px" }}
          >
            <Typography style={{color: "#FFFFFFF"}}>This website uses cookies to enhance the user experience.</Typography> 
          </CookieConsent>
        </Box>
        <Footer />
      </ThemeProvider>
    </Suspense>
  );
};

export default App;