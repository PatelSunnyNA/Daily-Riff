import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box>
      <Box sx={{ width: 1, height: 1 }}>
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          position="relative"
          minHeight={{ md: 800 }}
        >
          <Box
            width={1}
            order={{ xs: 2, md: 1 }}
            display="flex"
            alignItems="center"
          >
            <Container>
              <Box>
                <Box marginBottom={2}>
                  <Typography
                    color={theme.palette.text.primary}
                    variant="h2"
                    fontWeight={700}
                    align="center"
                  >
                    Welcome to
                  </Typography>
                  <Typography
                    color={theme.palette.primary.main}
                    variant="h2"
                    fontWeight={700}
                    align="center"
                    marginBottom={3}
                  >
                    Daily Riff
                  </Typography>
                  <Box marginBottom={3} align="center">
                    <Typography
                      variant="h6"
                      color={theme.palette.text.secondary}
                      align="center"
                    >
                      Daily riffs, exercises, and songs
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
