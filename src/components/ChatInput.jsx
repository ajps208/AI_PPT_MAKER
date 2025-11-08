import React, { useState, useRef, useEffect } from "react";
import { IconButton, Box, Paper } from "@mui/material";
import { Send, AttachFile, Add } from "@mui/icons-material";

export default function ChatInput({ onSend, inputCentered, disabled }) {
  const [text, setText] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current && !disabled) inputRef.current.focus();
  }, [disabled]);

  const handleSend = () => {
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        maxWidth: inputCentered ? "896px" : "100%",
        mx: inputCentered ? "auto" : 0,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          position: "relative",
          bgcolor: disabled ? "grey.100" : "white",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.300",
          opacity: disabled ? 0.7 : 1,
        }}
      >
        <textarea
          ref={inputRef}
          style={{
            width: "100%",
            padding: "12px 96px 12px 16px",
            border: "none",
            outline: "none",
            fontSize: "14px",
            fontFamily: "inherit",
            resize: "none",
            minHeight: "52px",
            borderRadius: "8px",
            background: "transparent",
          }}
          placeholder={
            disabled
              ? "Generating slides…"
              : inputCentered
              ? "Start with a topic, we'll turn it into slides!"
              : "Enter changes (e.g., 'Add a conclusion slide' or 'Simplify wording')"
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          disabled={disabled}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            display: "flex",
            gap: 1,
          }}
        >
          <IconButton size="small" sx={{ color: "grey.600" }} disabled>
            <AttachFile fontSize="small" />
          </IconButton>
          <IconButton
            onClick={handleSend}
            disabled={!text.trim() || disabled}
            size="small"
            sx={{
              bgcolor: text.trim() && !disabled ? "grey.800" : "grey.400",
              color: "white",
              borderRadius: 2,
              "&:hover": {
                bgcolor: text.trim() && !disabled ? "grey.900" : "grey.400",
              },
              "&:disabled": { bgcolor: "grey.400", color: "white" },
            }}
          >
            <Send fontSize="small" />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
