import {
    Avatar,
    Dialog, DialogContent,
    DialogTitle, Grid,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsOutlined";
import {List, Person} from "@mui/icons-material";
import {useState} from 'react';
import HistoryCard from "../HistoryCard";
import FriendRequestCard from "../FriendRequestCard";

function NotificationsPopUp() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    }

    const menuTypography = (text) => <Typography
        sx={{fontWeight: '500', fontSize: 14, color: '#858585', my: 1}}>{text}</Typography>;

    return (
        <>
            <IconButton id="basic-button"
                        onClick={handleClickOpen}>
                <NotificationsIcon sx={{width: 25, height: 25}}/>
            </IconButton>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>NOTIFICATIONS</DialogTitle>
                <DialogContent>
                    <Grid container justifyContent='flex-start' mb={1}>
                        {friends.map((data) => <FriendRequestCard key={data._id}{...data} />)}
                    </Grid>
                </DialogContent>

            </Dialog>
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