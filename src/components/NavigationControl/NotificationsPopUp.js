import {
    Avatar,
    Dialog, DialogContent,
    DialogTitle, Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Menu,
    MenuItem
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import { useState } from 'react';
import HistoryCard from "../HistoryCard";
import FriendRequestCard from "../FriendRequestCard";

function NotificationsPopUp() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClickOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const menuTypography = (text) => <Typography
        sx={{ fontWeight: '500', fontSize: 14, color: '#858585', my: 1 }}>{text}</Typography>;

    return (
        <>
            <IconButton id="notification-button"
                onClick={handleClickOpen}>
                <NotificationsIcon sx={{ width: 25, height: 25 }} />
            </IconButton>
            {/* <Dialog onClose={handleClose} open={open}>
                <DialogTitle>NOTIFICATIONS</DialogTitle>
                <DialogContent>
                    <Grid container justifyContent='flex-start' mb={1}>
                        {friends.map((data) => <FriendRequestCard key={data._id}{...data} />)}
                    </Grid>
                </DialogContent>

            </Dialog> */}

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
                    {friends.map((data) =>

                        <FriendRequestCard key={data._id}{...data} />

                    )}
                </List>
            </Menu>

        </>)

}

const friends = [
    {
        _id: 1,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    },
    {
        _id: 2,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    },
    {
        _id: 3,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    },
    {
        _id: 4,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    },
    {
        _id: 5,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    }
]

export default NotificationsPopUp;