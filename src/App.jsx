import { Navbar, Home, Resources, NOIs } from './components';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router";

import theme from "./styles/theme";


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="/NOIs" element={<NOIs />} />
      </Routes>

    </ThemeProvider>

  );
};

export default App;