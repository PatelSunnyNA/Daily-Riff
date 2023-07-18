import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TabViewer from "../../components/TabViewer";
import { Divider, Typography } from "@mui/material";
const Song = () => {
  var date = new Date();

  // Get year, month, and day part from the date
  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });

  // Generate yyyy-mm-dd date string
  var formattedDate = `${month}/${day}`;
  return (
    <div>
      <Box sx={{ marginTop: "10px" }}>
        <Box sx={{ marginY: "20px" }}>
          <Divider>
            <Typography variant="h1" align="center">
              Song for {formattedDate}
            </Typography>
          </Divider>
        </Box>
        <Box sx={{ paddingX:2, paddingY:2 }}>
          <TabViewer level={1} category={"exercises"} />
        </Box>
      </Box>
    </div>
  );
};

export default Song;


