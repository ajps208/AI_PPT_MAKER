'use client';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';


export default function SideBarNew() {
const messages = []
const toggleSidebar = true


return (
<Drawer variant="persistent" open anchor="left">
<Box sx={{ width: 300, p: 2 }}>
<Button onClick={toggleSidebar} variant="outlined">Close</Button>
<List>
{messages.length === 0 && <Box sx={{ p: 2 }}>No chats yet</Box>}
{messages.map(m => (
<ListItem key={m.id} button>
<ListItemText primary={m.role === 'user' ? `You: ${m.text.slice(0, 30)}` : `AI: ${m.text.slice(0, 30)}`} />
</ListItem>
))}
</List>
</Box>
</Drawer>
);
}