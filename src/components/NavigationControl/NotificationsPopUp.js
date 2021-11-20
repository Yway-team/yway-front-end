import {IconButton, MenuItem, Typography} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import {Menu} from "@mui/icons-material";
import {useState} from "react";

function NotificationsPopUp() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuTypography = (text) => <Typography
        sx={{fontWeight: '500', fontSize: 14, color: '#858585', my: 1}}>{text}</Typography>;

    return (
        <>
            <IconButton size='small' sx={{ml: 2}} onClick={handleClick}>
                <NotificationsIcon sx={{width: 25, height: 25}}/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </>)

}

export default NotificationsPopUp;