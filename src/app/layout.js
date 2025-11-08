'use client';
import React from 'react';
import Head from 'next/head';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import "../app/globals.css";
import SideBarNew from '@/components/SideBarNew';


const theme = createTheme({
palette: { mode: 'light' },
components: { MuiButton: { defaultProps: { disableElevation: true } } }
});


export default function RootLayout({ children }) {
const sidebarOpen = false

return (
<html lang="en">
<Head>
<meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
<body>
<ThemeProvider theme={theme}>
<CssBaseline />
{/* <Navbar /> */}
<Box sx={{ display: 'flex',}}>
{sidebarOpen && <SideBarNew />}
<Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
</Box>
</ThemeProvider>
</body>
</html>
);
}