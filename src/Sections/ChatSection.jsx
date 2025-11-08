import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import {Add } from "@mui/icons-material";
import SlideshowIcon from '@mui/icons-material/Slideshow';
import ChatInput from "@/components/ChatInput";
import ChatResponse from "@/components/ChatResponse";

export default function ChatSection({
  messages,
  inputCentered,
  onSend,
  hasPPT,
  loading,
}) {
  return (
    <Box
      sx={{
        width: hasPPT ? "55%" : "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s",
      }}
    >
      {inputCentered ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 768, textAlign: "center" }}>
            <Box sx={{ mb: 1 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  width: 64,
                  height: 64,
                  bgcolor: "black",
                  borderRadius: 4,
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: 700 }}
                >
                  AI
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: "grey.900", mb: 1.5 }}
            >
              Hello, User !
            </Typography>
            <Typography variant="h6" sx={{ color: "grey.600", mb: 4 }}>
              What do you want me to generate today?
            </Typography>
            <ChatInput
              onSend={onSend}
              inputCentered={true}
              disabled={loading}
            />
          </Box>
        </Box>
      ) : (
        <Paper
          elevation={1}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.paper",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "grey.200",
            height: "100%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 3,
              py: 2,
              borderBottom: "1px solid",
              borderColor: "grey.200",
              position: "sticky",
              top: 0,
              bgcolor: "background.paper",
              zIndex: 1,
            }}
          >
           <SlideshowIcon/>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                letterSpacing: 0.3,
              }}
            >
              AI Slides
            </Typography>
            {/* New Chat */}
            <Box sx={{ ml: "auto" }}>
              <Button
                variant="outlined"
                startIcon={<Add />}
                sx={{
                  textTransform: "none",
                  color: "grey.800",
                  borderColor: "grey.300",
                  fontWeight: 500,
                  "&:hover": { borderColor: "grey.400", bgcolor: "grey.50" },
                }}
                onClick={() => window.location.reload()}
              >
                New Chat
              </Button>
            </Box>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              px: 3,
              py: 2,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              backgroundColor: "grey.50",
            }}
          >
            {messages.map((m) => (
              <ChatResponse key={m.id} msg={m} />
            ))}
          </Box>

          {/* Input */}
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid",
              borderColor: "grey.200",
              position: "sticky",
              bottom: 0,
              bgcolor: "background.paper",
            }}
          >
            <ChatInput
              onSend={onSend}
              inputCentered={false}
              disabled={loading}
            />
          </Box>
        </Paper>
      )}
    </Box>
  );
}
