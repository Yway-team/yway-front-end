import {
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    Avatar,
    IconButton
} from "@mui/material";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import { GoogleLogout } from 'react-google-login';
import { useState } from 'react';
import { globalState } from '../State/UserState';

function ProfileAvatar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        globalState({
            loggedin: false,
            googleId: "",
            _id: ""
        });
        console.log(`Logged out`);
    }

    return (
        <><IconButton size='small' sx={{ ml: 2 }}>
            <NotificationsIcon sx={{ width: 25, height: 25 }}></NotificationsIcon>
        </IconButton>
            <IconButton onClick={handleProfileClick} size="small" sx={{ ml: 2 }}>
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleProfileMenuClose}
                onClick={handleProfileMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1
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
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem>
                    <Avatar /> Manage Google Account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    My profile
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <GroupsIcon fontSize="small" />
                    </ListItemIcon>
                    My platforms
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <DynamicFormIcon fontSize="small" />
                    </ListItemIcon>
                    My quizzes
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Friends
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <EmojiEventsIcon fontSize="small" />
                    </ListItemIcon>
                    Achievements
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <HistoryIcon fontSize="small" />
                    </ListItemIcon>{" "}
                    History
                </MenuItem>
                <Divider />


                <GoogleLogout
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    onLogoutSuccess={handleLogout}
                    render={renderProps => (
                        <MenuItem onClick={renderProps.onClick}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Sign Out
                        </MenuItem>
                    )}
                >
                </GoogleLogout>

            </Menu></>
    )
}

export default ProfileAvatar;
