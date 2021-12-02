import React from 'react'
import { QuizCard } from '..'
import { Grid, Stack, Avatar, Box, Button, CircularProgress } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function ModeratorQuizCard(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <Box sx={{position: "relative"}}>
            <QuizCard {...props}/>
            <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ position: "absolute", top: "25px", right: "10px" }}
            >
                <SettingsIcon sx={{ color: "white" }} />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Veiw Quiz Details</MenuItem>
                <MenuItem onClick={handleClose}>Delete Quiz</MenuItem>
            </Menu>
        </Box>
    )
}