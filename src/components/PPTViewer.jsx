import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { Close, Check, Download } from "@mui/icons-material";
import generatePpt from "@/lib/generatePPT";

export default function PPTViewer({ ppt, onClose }) {
  if (!ppt) return null;
  
  console.log("ppt",ppt);
  
  const handleDownload = () => generatePpt(ppt);

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "grey.50",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "grey.300",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2,
          bgcolor: "white",
          borderBottom: "1px solid",
          borderColor: "grey.300",
          gap: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Check sx={{ color: "green.600" }} />
          <Typography variant="body1" sx={{ color: "grey.700", fontWeight: 500 }}>
            {ppt.slideCount} slides generated
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            onClick={handleDownload}
            variant="contained"
            startIcon={<Download />}
            sx={{ textTransform: "none" }}
          >
            Download PPT
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            startIcon={<Close />}
            sx={{ textTransform: "none", color: "grey.700", borderColor: "grey.300" }}
          >
            Edit Presentation
          </Button>
        </Box>
      </Box>

      {/* Slides */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 3,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {ppt.slides?.map((slide, index) => (
          <Box key={slide.id ?? index} sx={{ mb: 3, "&:last-child": { mb: 0 } }}>
            <Paper
              elevation={3}
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                overflow: "hidden",
                aspectRatio: "16/9",
              }}
            >
              {slide.type === "title" ? (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    bgcolor: slide.bgColor || "#7a9b8e",
                  }}
                >
                  <Typography
                    sx={{
                      position: "absolute",
                      left: 32,
                      color: "white",
                      fontSize: "64px",
                      fontWeight: 300,
                      opacity: 0.2,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Typography>
                  {slide.image && (
                    <Box
                      sx={{
                        position: "absolute",
                        left: 64,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 256,
                        height: 256,
                        boxShadow: 8,
                      }}
                    >
                      <img
                        src={slide.image}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                  )}
                  <Box sx={{ textAlign: "right", pr: 8, zIndex: 1 }}>
                    <Typography
                      variant="h2"
                      sx={{
                        color: "white",
                        fontSize: "48px",
                        fontWeight: 700,
                        mb: 2,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {slide.heading}
                    </Typography>
                    {slide.subtitle && (
                      <>
                        <Box sx={{ width: 64, height: 4, bgcolor: "white", ml: "auto", mb: 2 }} />
                        <Typography variant="h5" sx={{ color: "white" }}>
                          {slide.subtitle}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    bgcolor: slide.bgColor || "#f5f5f5",
                  }}
                >
                  <Typography
                    sx={{
                      position: "absolute",
                      left: 32,
                      color: "grey.300",
                      fontSize: "64px",
                      fontWeight: 300,
                      opacity: 0.3,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      maxWidth: 768,
                      px: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {slide.image && (
                      <Box sx={{ width: 320, height: 256, flexShrink: 0, boxShadow: 4 }}>
                        <img
                          src={slide.image}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </Box>
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h3"
                        sx={{ color: "grey.600", fontSize: "36px", fontWeight: 700, mb: 2 }}
                      >
                        {slide.heading}
                      </Typography>
                      {slide.content && (
                        <Typography variant="body1" sx={{ color: "grey.700", fontSize: "18px", whiteSpace: "pre-wrap" }}>
                          {slide.content}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
