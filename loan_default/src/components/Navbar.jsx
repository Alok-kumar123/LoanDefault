import React from 'react';
import {Box, AppBar,Typography,Toolbar} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Link to='/' style={{color:'white'}}>
        <Typography variant="h6" color="inherit" component="div" style={{cursor:'pointer'}}>
          Home
        </Typography>
        </Link > 
        <Link to='/about' style={{color:'white'}}>
        <Typography variant="h6" color="inherit" component="div" style={{margin:"0px 40px 0", cursor:'pointer'}}>
          About
        </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar
