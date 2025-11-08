"use client";
import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import { Menu, Delete } from "@mui/icons-material";
import { clearHistory } from "@/lib/storage";

export default function SidebarNew({ open, onToggle, sessions, onSelect }) {
  return (
    <>
      {/* sidebar icon */}
      <IconButton
        onClick={onToggle}
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1201,
          bgcolor: "white",
          boxShadow: 1,
          "&:hover": { bgcolor: "grey.100" },
        }}
      >
        <Menu />
      </IconButton>
      {/* sidebar */}
      <Drawer anchor="left" open={open} onClose={onToggle}>
        <Box
          sx={{
            width: 280,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" fontWeight={500}>
              Chat History
            </Typography>
          </Box>
          <Divider />

          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <List>
              {sessions.length === 0 && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ p: 2, textAlign: "center" }}
                >
                  No saved chats yet
                </Typography>
              )}
              {sessions.map((s, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton onClick={() => onSelect(s)}>
                    <ListItemText
                      primary={s.title || "Untitled Topic"}
                      secondary={new Date(s.timestamp).toLocaleString()}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          {sessions.length > 0 && (
            <Box sx={{ p: 2, borderTop: "1px solid #eee" }}>
              <Button
                onClick={() => {
                  clearHistory();
                  window.location.reload();
                }}
                variant="outlined"
                fullWidth
                startIcon={<Delete />}
                sx={{ textTransform: "none" }}
              >
                Clear History
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
}
