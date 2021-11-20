import {Grid, IconButton, InputBase, Paper} from "@mui/material";
import {CommonTitle, FriendCard} from '..';
import FriendRequestCard from "../FriendRequestCard";
import {SearchRounded} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";

export default function Friends({userId}) {
    const theme = useTheme();
    return (
        <Grid container direction='column'
              sx={{display: 'flex', justifyContent: 'center', width: '100%', py: 2, pl: 3}}>
            <Paper
                elevation={0}
                component="form"
                sx={{
                    px: 2,
                    display: 'flex',
                    alignItems: 'center',

                    width: '100%',
                    height: '36px',
                    maxWidth: '500px',
                    background: theme.palette.grey[200]
                }}
            >
                <InputBase
                    sx={{
                        ml: 1, flex: 1, fontSize: 14, fontWeight: 500,
                    }}
                    placeholder="Enter username or userID"
                    inputProps={{'aria-label': 'search Yway'}}
                />
                <IconButton type="submit" sx={{p: '3px'}} aria-label="search">
                    <SearchRounded sx={{fill: theme.palette.grey['500']}}/>
                </IconButton>
            </Paper>

            <CommonTitle title='FRIEND REQUESTS'/>
            <Grid container justifyContent='flex-start' mb={1}>
                {friends.map((data) => <FriendRequestCard key={data._id}{...data} />)}
            </Grid>
            <CommonTitle title='FRIENDS'/>
            <Grid container justifyContent='flex-start' mb={1}>
                {friends.map((data) => <FriendCard key={data._id}{...data} />)}
            </Grid>
        </Grid>
    );
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
    },
    {
        _id: 6,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    },
    {
        _id: 7,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    },
    {
        _id: 8,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    }
]