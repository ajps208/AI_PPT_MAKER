import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { Close, Check, Download } from "@mui/icons-material";
import generatePpt from "@/lib/generatePPT";

export default function PPTViewer({ ppt, onClose }) {
  if (!ppt) return null;
  
  const handleDownload = () => {
    // console.log("Download PPT", ppt);
    generatePpt(ppt);
  };

  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "#f8f9fa",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
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

      {/* Slides Container */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 4,
          scrollbarWidth: "thin",
          scrollbarColor: "#cbd5e1 transparent",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "#cbd5e1",
            borderRadius: "4px",
            "&:hover": { bgcolor: "#94a3b8" },
          },
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          {ppt.slides?.map((slide, index) => (
            <Box key={slide.id ?? index} sx={{ mb: 4, "&:last-child": { mb: 0 } }}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "white",
                  borderRadius: 2,
                  overflow: "hidden",
                  aspectRatio: "16/9",
                  border: "1px solid",
                  borderColor: "#e5e7eb",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {slide.type === "title" ? (
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      position: "relative",
                      bgcolor: slide.bgColor || "#6366f1",
                      background: slide.bgColor
                        ? slide.bgColor
                        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      px: 6,
                    }}
                  >
                    {slide.image && (
                      <Box
                        sx={{
                          width: 280,
                          height: 280,
                          borderRadius: 2,
                          overflow: "hidden",
                          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={slide.image}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </Box>
                    )}
                    <Box
                      sx={{
                        textAlign: "right",
                        flex: 1,
                        pl: slide.image ? 6 : 0,
                        pr: 4,
                        maxWidth: slide.image ? "calc(100% - 320px)" : "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "42px",
                          fontWeight: 700,
                          mb: 2,
                          lineHeight: 1.2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          wordBreak: "break-word",
                        }}
                      >
                        {slide.heading}
                      </Typography>
                      {slide.subtitle && (
                        <>
                          <Box
                            sx={{
                              width: 80,
                              height: 4,
                              bgcolor: "white",
                              ml: "auto",
                              mb: 2,
                              borderRadius: 2,
                            }}
                          />
                          <Typography
                            sx={{
                              color: "rgba(255,255,255,0.95)",
                              fontSize: "20px",
                              fontWeight: 400,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
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
                      position: "relative",
                      bgcolor: slide.bgColor || "#ffffff",
                      px: 6,
                      py: 5,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        pt: 3,
                      }}
                    >
                      {slide.image && (
                        <Box
                          sx={{
                            width: 360,
                            height: 270,
                            flexShrink: 0,
                            borderRadius: 2,
                            overflow: "hidden",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                          }}
                        >
                          <img
                            src={slide.image}
                            alt=""
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </Box>
                      )}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            color: "#1f2937",
                            fontSize: "32px",
                            fontWeight: 700,
                            mb: 2.5,
                            lineHeight: 1.3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {slide.heading}
                        </Typography>
                        {slide.content && (
                          <Typography
                            sx={{
                              color: "#4b5563",
                              fontSize: "16px",
                              lineHeight: 1.7,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 6,
                              WebkitBoxOrient: "vertical",
                              whiteSpace: "pre-wrap",
                              wordBreak: "break-word",
                            }}
                          >
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
    </Box>
  );
}