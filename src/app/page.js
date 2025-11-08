"use client";
import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ChatSection from "@/Sections/ChatSection";
import PPTSection from "@/Sections/PPTSection";

const theme = createTheme({
  palette: { background: { default: "#f9fafb" } },
});

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [pptData, setPptData] = useState(null);
  const [inputCentered, setInputCentered] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
    setInputCentered(false);
  };

  const handleSend = async (text) => {
    if (isGenerating) return;

    const userMsg = { id: Date.now() + "-u", role: "user", text };
    addMessage(userMsg);
    setIsGenerating(true);

    try {
      // Show thinking message
      addMessage({
        id: Date.now() + "-t1",
        type: "thought",
        title: "Thinking...",
        text: "I'm analyzing your topic and planning the presentation structure. I'll create an engaging and informative slide deck with clear sections and valuable content.",
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show search simulation
      addMessage({
        id: Date.now() + "-s",
        type: "search",
        title: "Researching topic",
        subtitle: `"${text}"`,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show analysis
      addMessage({
        id: Date.now() + "-t2",
        type: "thought",
        title: "Creating presentation",
        text: "I'm now generating your slides with well-structured content, engaging visuals, and a professional layout. The presentation will cover key aspects of your topic comprehensively.",
      });

      // Call API to generate slides
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: text }),
      });
     
      // console.log(response,"response");
      
      if (!response.ok) {
        throw new Error("Failed to generate slides");
      }

      const slideData = await response.json();

     

      setPptData(slideData);

      // Success message
      addMessage({
        id: Date.now() + "-success",
        type: "thought",
        title: "✓ Presentation Generated",
        text: `Successfully created a ${slideData.slideCount}-slide presentation about "${slideData.title}". You can view it on the right and download it as a PowerPoint file.`,
      });
    } catch (error) {
      console.error("Error:", error);
      addMessage({
        id: Date.now() + "-error",
        type: "thought",
        title: "❌ Error",
        text: "Sorry, there was an error generating the presentation. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const clearPpt = () => setPptData(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Container maxWidth="xl" sx={{ p: 3 }}>
          <Box sx={{ display: "flex", gap: 3, height: "calc(100vh - 3rem)" }}>
            <ChatSection
              messages={messages}
              inputCentered={inputCentered}
              onSend={handleSend}
              hasPPT={!!pptData}
              loading={loading}
            />
            <PPTSection pptData={pptData} onClose={clearPpt} />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
