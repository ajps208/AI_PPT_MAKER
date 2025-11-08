'use client';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';


export default function Navbar() {
const toggleSidebar = true


return (
<AppBar position="fixed">
<Toolbar>
<IconButton edge="start" color="inherit" onClick={toggleSidebar} aria-label="menu">
<MenuIcon />
</IconButton>
<Typography variant="h6" component="div">PPT AI App</Typography>
</Toolbar>
</AppBar>
);
}