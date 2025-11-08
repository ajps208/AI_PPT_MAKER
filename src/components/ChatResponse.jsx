import React from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import { Check, ChevronRight } from '@mui/icons-material';

export default function ChatResponse({ msg }) {
  const isUser = msg.role === 'user';
  const isThought = msg.type === 'thought';
  
  if (isThought) {
    return (
      <Box sx={{ mb: 2 }}>
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'white',
            border: '1px solid',
            borderColor: 'purple.200',
            borderRadius: 2,
            p: 2
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="body2" sx={{ color: 'purple.600', fontWeight: 600 }}>
              {msg.title}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'grey.700', whiteSpace: 'pre-wrap' }}>
            {msg.text}
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (msg.type === 'search' || msg.type === 'reading') {
    return (
      <Box sx={{ mb: 2 }}>
        <Paper
          elevation={0}
          sx={{
            bgcolor: 'white',
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
            p: 2,
            '&:hover': {
              boxShadow: 2
            },
            transition: 'box-shadow 0.2s'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ color: 'grey.600' }}>
              {msg.type === 'search' ? '🔍' : '🌐'}
            </Typography>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ color: 'grey.900', fontWeight: 500 }}>
                  {msg.title}
                </Typography>
                {msg.type === 'search' && (
                  <Check fontSize="small" sx={{ color: 'green.600' }} />
                )}
              </Box>
              {msg.subtitle && (
                <Typography variant="caption" sx={{ color: 'grey.500', mt: 0.5, display: 'block' }}>
                  {msg.subtitle}
                </Typography>
              )}
            </Box>
            <IconButton size="small" sx={{ color: 'grey.400' }}>
              <ChevronRight />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <Paper
        elevation={0}
        sx={{
          maxWidth: '768px',
          bgcolor: isUser ? 'grey.100' : 'white',
          borderRadius: 2,
          px: 2,
          py: 1.5
        }}
      >
        <Typography variant="body2" sx={{ color: 'grey.800', whiteSpace: 'pre-wrap' }}>
          {msg.text}
        </Typography>
      </Paper>
    </Box>
  );
}
