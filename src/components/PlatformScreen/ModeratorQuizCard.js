import React from 'react'
import { QuizCard } from '..'
import { Grid, Stack, Avatar, Box, Button, CircularProgress } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { REMOVE_QUIZ_FROM_PLATFORM } from '../../controllers/graphql/platform-mutations';
import { useMutation } from '@apollo/client';

export default function ModeratorQuizCard(props) {
    const [removeQuizFromPlatform] = useMutation(REMOVE_QUIZ_FROM_PLATFORM, { variables: { platformId: props.platformId, quizId: props._id } });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleRemoveQuizFromPlatform = () => {
        removeQuizFromPlatform().then(props.refetch);
        handleClose();
    }
  
    return (
        <Box sx={{position: "relative"}} key={props._id}>
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
                <MenuItem onClick={handleRemoveQuizFromPlatform}>Remove Quiz</MenuItem>
            </Menu>
        </Box>
    )
}