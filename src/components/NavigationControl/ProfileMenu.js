import {
    Menu,
    MenuItem,
    ListItemIcon,
    Divider,
    Avatar,
    IconButton,
    Typography
} from "@mui/material";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import GroupsIcon from "@mui/icons-material/Groups";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import { GoogleLogout } from 'react-google-login';
import { useState } from 'react';
import { globalState, globalLoggedIn, loggedInChanged } from '../../state/UserState';
import { useReactiveVar } from "@apollo/client";
import { useHistory } from 'react-router-dom';


function ProfileMenu() {
    const user = useReactiveVar(globalState);
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        globalLoggedIn(false);
        globalState({
            _id: ""
        });
        loggedInChanged(true);
        history.replace('/');
        console.log(`Logged out`);
    }

    const menuTypography = (text) => <Typography
        sx={{ fontWeight: '500', fontSize: 14, color: '#858585', my: 1 }}>{text}</Typography>;


    return (
        <>
            <IconButton onClick={handleProfileClick} size="small" sx={{ mx: 2 }}>
                <Avatar sx={{ width: 32, height: 32, border: anchorEl ? '3px solid #FF5A1D' : '3px solid transparent' }}
                    src={user.avatar} imgProps={{ style: { borderRadius: '50%', objectFit: 'fill' } }}></Avatar>
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
                        minWidth: 270,
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
                <MenuItem sx={{ my: 1, py: 5 }}>
                    <Avatar sx={{
                        width: 32, height: 32
                    }} src={user.avatar} imgProps={{ style: { borderRadius: '50% ', objectFit: 'fill' } }}></Avatar>
                    <Typography sx={{ fontWeight: '700', fontSize: 16, color: 'palette.primary.main', my: 1 }}> {user.username}</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                    history.push('/user');
                }}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    {menuTypography('My profile')}
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <GroupsIcon />
                    </ListItemIcon>
                    {menuTypography('My platforms')}
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <DynamicFormIcon />
                    </ListItemIcon>
                    {menuTypography('My quizzes')}
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd />
                    </ListItemIcon>
                    {menuTypography('Friends')}
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <EmojiEventsIcon />
                    </ListItemIcon>
                    {menuTypography('Achievements')}
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon> {menuTypography('History')}
                </MenuItem>
                <Divider sx={{ background: '#FF5A1D' }} />
                <GoogleLogout
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    onLogoutSuccess={handleLogout}
                    render={renderProps => (
                        <MenuItem onClick={renderProps.onClick}>
                            <ListItemIcon>
                                <Logout style={{ fill: '#FF5A1D' }} />
                            </ListItemIcon>
                            <Typography sx={{ fontWeight: '500', fontSize: 14, color: '#FF5A1D', my: 1 }}>Sign
                                out</Typography>
                        </MenuItem>
                    )}
                >
                </GoogleLogout>
            </Menu>
        </>
    )
}

export default ProfileMenu;
