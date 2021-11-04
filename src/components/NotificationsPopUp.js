import { IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";

function NotificationsPopUp() {
    return (
        <IconButton size='small' sx={{ ml: 2 }}>
            <NotificationsIcon sx={{ width: 25, height: 25 }}></NotificationsIcon>
        </IconButton>)
}

export default NotificationsPopUp;