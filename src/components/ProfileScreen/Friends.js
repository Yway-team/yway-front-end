import { Grid } from "@mui/material";
import { CommonTitle, FriendCard } from '..';
export default function Friends() {
    return (
        <Grid container direction='column' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', py: 2, pl: 3 }}>
            <CommonTitle title='FRIENDS' />
            <Grid container justifyContent='flex-start' mb={1}>

                {friends.map((data) => <FriendCard key={data._id}{...data} />)}

            </Grid>
        </Grid >
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