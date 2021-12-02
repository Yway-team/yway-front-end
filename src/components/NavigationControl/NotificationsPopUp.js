import {
    IconButton,
    List,
    Typography,
    Menu,
    Box,
    Avatar
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import { useState } from 'react';
import NotificationCard from "../FriendRequestCard";


function NotificationsPopUp() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [read, setRead] = useState(false);

    const handleClickOpen = (event) => {
        setAnchorEl(event.currentTarget);
        if (!read) {
            setRead(true);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const numberOfNotifications = notifications.length;


    return (
        <>
            <Box sx={{ position: 'relative' }}>
                <IconButton id="notification-button"
                    onClick={handleClickOpen} >
                    <NotificationsIcon sx={{ width: 25, height: 25 }} />
                </IconButton>
                {!read ?
                    <Avatar sx={{ position: 'absolute', top: 2, right: -1, height: 20, width: 20, backgroundColor: 'primary.main' }}>
                        <Typography fontSize={14}>
                            {numberOfNotifications}
                        </Typography>
                    </Avatar> : null
                }

            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "auto",
                        width: 350,
                        height: '60%',
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1,
                        "& .MuiAvatar-root": {
                            width: 36,
                            height: 36,
                            ml: 0.3,
                            mr: 1.3
                        },
                        '& .MuiMenuItem-root': {
                            p: '7px',
                            paddingLeft: '30px'
                        },
                        '& .MuiSvgIcon-root': {
                            ml: 1,
                            mr: 3,
                            my: 0.5,
                            fill: '#858585',
                            fontSize: 19,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0
                        }
                    }
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>

                <List>
                    {notifications.map((data) =>
                        <NotificationCard key={data._id}{...data} />

                    )}
                </List>
            </Menu>

        </>)

}

const notifications = [
    {
        _id: 1,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
        type: 'friendRequest',
        createdAt: Date.now()
    },
    {
        _id: 1,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
        type: 'friendRequest',
        createdAt: Date.now()
    },
    {
        _id: 2,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
        type: 'friendRequest',
        createdAt: Date.now()
    },
    {
        _id: 3,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
        type: 'friendRequest',
        createdAt: Date.now()
    },
    {
        _id: 4,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
        type: 'friendRequest',
        createdAt: Date.now()
    },

]

export default NotificationsPopUp;