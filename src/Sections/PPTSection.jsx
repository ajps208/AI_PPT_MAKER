import React from "react";
import { Box } from "@mui/material";
import PPTViewer from "@/components/PPTViewer";

export default function PPTSection({ pptData, onClose }) {
  if (!pptData) return null;
  return (
    <Box sx={{ width: "45%", transition: "all 0.3s" }}>
      <PPTViewer ppt={pptData} onClose={onClose} />
    </Box>
  );
}
