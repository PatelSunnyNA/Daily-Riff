import { Box, Typography } from "@mui/material";
import Hero from "./Hero";

function Home() {


  return (
    <Box width="100vw"  margin="0 auto" paddingX={2} paddingY={2}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box>
        <Hero/>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
