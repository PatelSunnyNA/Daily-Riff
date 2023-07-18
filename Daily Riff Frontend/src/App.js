import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, Card, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Navbar from "./pages/global/Navbar";
import Home from "./pages/home/Home";
import Riff from "./pages/riff/Riff";
import Song from "./pages/song/Song";
import Exercise from "./pages/exercise/Exercise";
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Box width={1}>
            <ScrollToTop />
            <Navbar />
            <main className="content">
              <Box
                mt="65px"
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <Box width="90%" display="flex" justifyContent="center">
                  <Card>
                    <Routes>
                      <Route exact path="/" element={<Home />} />

                      <Route exact path="/riff" element={<Riff />} />
                      <Route exact path="/song" element={<Song />} />
                      <Route exact path="/exercise" element={<Exercise />} />
                    </Routes>
                  </Card>
                </Box>
              </Box>
            </main>
          </Box>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;