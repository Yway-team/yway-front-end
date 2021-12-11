import {
    IconButton,
    List,
    Typography,
    Menu,
    Box,
    Avatar,
    Grid
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import { useState } from 'react';
import NotificationCard from "../NotificationCard";
import { globalState } from "../../state/UserState";
import { useReactiveVar } from '@apollo/client';
import { useMutation } from "@apollo/client";
import { SET_READ_NOTIFICATIONS } from '../../controllers/graphql/user-mutations';


function NotificationsPopUp() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [read, setRead] = useState(false);
    const user = useReactiveVar(globalState);
    const [setReadNotis] = useMutation(SET_READ_NOTIFICATIONS);
    const handleClickOpen = (event) => {
        setAnchorEl(event.currentTarget);
        if (!read) {
            setRead(true);
        }
    };

    const handleClose = async () => {
        setAnchorEl(null);
        if (unreadNotis.length > 0) {
            const { data } = await setReadNotis({ variables: { time: notifications[0].createdAt.toString() } });
            let dataToAdd = { ...user };
            dataToAdd.notifications = data.setReadNotifications;
            globalState(dataToAdd);
        }

    }
    let notifications = user.notifications;
    let readNotis = [];
    let unreadNotis = [];

    const numberOfNotifications = notifications ? notifications.length : 0;

    if (notifications) {
        unreadNotis = notifications.filter((noti) => noti.unread);
        readNotis = notifications.filter((noti) => !noti.unread);
    }


    return (
        notifications ?
            <>
                <Box sx={{ position: 'relative' }}>
                    <IconButton id="notification-button"
                        onClick={handleClickOpen} >
                        <NotificationsIcon sx={{ width: 25, height: 25 }} />
                    </IconButton>
                    {!read && numberOfNotifications != 0 ?
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
                        <Grid sx={{ width: '100%' }}>
                            <Typography sx={{
                                fontWeight: '700',
                                fontSize: 16,
                                color: 'primary.main',
                                my: 1,
                                ml: 3
                            }
                            }> NOTIFICATIONS </Typography >
                        </Grid >
                        {
                            unreadNotis.length === 0 ? <Grid sx={{ width: '100%' }}>
                                <Typography sx={{
                                    fontWeight: '600',
                                    fontSize: 14,
                                    color: 'grey.500',
                                    my: 3,
                                    ml: 3
                                }
                                }> There is no new notification yet. </Typography >  </Grid > : null
                        }
                        {unreadNotis.map((data) =>
                            <NotificationCard key={data._id}{...data} />

                        )}
                        {readNotis.length != 0 ? <Grid sx={{ width: '100%' }}>
                            <Typography sx={{
                                fontWeight: '700',
                                fontSize: 16,
                                color: 'commmon.black',
                                my: 1,
                                ml: 3
                            }
                            }> Older </Typography >  </Grid > : null}
                        {readNotis.map((data) =>
                            <NotificationCard key={data._id}{...data} />)}

                    </List>
                </Menu>

            </> : <> </>);

}

// const notifications = [
//     {
//         _id: 0,
//         avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
//         name: 'SoekindoGName123',
//         type: 'friendRequest',
//         createdAt: Date.now()
//     },
//     {
//         _id: 1,
//         avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
//         name: 'SoekindoGName123',
//         type: 'friendRequest',
//         createdAt: Date.now()
//     },
//     {
//         _id: 2,
//         avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
//         name: 'SoekindoGName123',
//         type: 'friendRequest',
//         createdAt: Date.now()
//     },
//     {
//         _id: 3,
//         avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
//         name: 'SoekindoGName123',
//         type: 'friendRequest',
//         createdAt: Date.now()
//     },
//     {
//         _id: 4,
//         avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
//         name: 'SoekindoGName123',
//         type: 'friendRequest',
//         createdAt: Date.now()
//     },

// ]

export default NotificationsPopUp;