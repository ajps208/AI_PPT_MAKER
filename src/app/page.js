"use client";
import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ChatSection from "@/Sections/ChatSection";
import PPTSection from "@/Sections/PPTSection";
import SidebarNew from "@/components/SideBarNew";
import { saveSession, getSessions } from "@/lib/storage";

const theme = createTheme({
  palette: { background: { default: "#f9fafb" } },
});

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [pptData, setPptData] = useState(null);
  const [inputCentered, setInputCentered] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState([]);

  // Load sessions on component mount
  useEffect(() => {
    setSessions(getSessions());
  }, []);

  // 
  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
    setInputCentered(false);
  };

  // function to handle sending a message
  const handleSend = async (text) => {
    if (isGenerating) return;

    const userMsg = { id: Date.now() + "-u", role: "user", text };
    addMessage(userMsg);
    setIsGenerating(true);

    try {
      const endpoint = pptData ? "/api/update" : "/api/generate";
      const payload = pptData ? { pptData, prompt: text } : { topic: text };

      addMessage({
        id: Date.now() + "-t",
        type: "thought",
        title: pptData ? "Updating Presentation..." : "Generating Presentation...",
        text: pptData
          ? "I'm applying your requested updates..."
          : "I'm creating your slides, please wait...",
      });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      setPptData(data);

      addMessage({
        id: Date.now() + "-done",
        type: "thought",
        title: "✅ Done",
        text: pptData
          ? "Presentation updated successfully."
          : `Created ${data.slideCount} slides about "${data.title}".`,
      });

      const session = {
        id: Date.now(),
        title: data.title || text,
        messages: [...messages, userMsg],
        pptData: data,
        timestamp: Date.now(),
      };
      saveSession(session);
      setSessions(getSessions());
    } catch (err) {
      console.error(err);
      addMessage({
        id: Date.now() + "-err",
        type: "thought",
        title: "Error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // function to handle selecting a session
  const handleSelectSession = (session) => {
    setMessages(session.messages);
    setPptData(session.pptData);
    setInputCentered(false);
    setSidebarOpen(false);
  };

  const clearPpt = () => setPptData(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SidebarNew
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        sessions={sessions}
        onSelect={handleSelectSession}
      />

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
