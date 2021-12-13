import { Grid, IconButton, InputBase, Paper, Typography, CircularProgress } from "@mui/material";
import { CommonTitle, FriendCard } from '..';
import NotificationCard from "../NotificationCard";
import { SearchRounded } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { globalState } from "../../state/UserState";
import { GET_USER_FRIENDS_INFO } from '../../controllers/graphql/user-queries';
import { useQuery } from "@apollo/client";
export default function Friends({ userId, isOwn }) {
    const theme = useTheme();
    let friends = [];
    let friendRequests = [];

    const { data, loading } = useQuery(GET_USER_FRIENDS_INFO, { variables: { userId: userId } })


    if (loading) {
        return (
            <Grid container justifyContent='center' alignItems='center' sx={{ height: '40vh', width: '100%' }}>
                <CircularProgress variant='indeterminate' color='primary' />
            </Grid>
        );
    }

    if (data) {
        console.log(data);
        friends = data.getUserFriendsInfo.friendsInfo ? data.getUserFriendsInfo.friendsInfo : [];
        friendRequests = data.getUserFriendsInfo.friendRequestsInfo ? data.getUserFriendsInfo.friendRequestsInfo : [];
    }


    return (
        <Grid container direction='column'
            sx={{
                display: 'flex', justifyContent: 'center', width: '100%', py: 2, pl: 3, [`&:focus-within`]: {
                    '& svg': { fill: theme.palette.primary.main }
                }
            }}>
            {friends ? <>{isOwn ? <>
                {/* <Paper
                    elevation={0}
                    component="form"
                    sx={{
                        px: 2,
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        height: '36px',
                        maxWidth: '500px',
                        background: theme.palette.grey[200],

                    }}
                >
                    <InputBase
                        sx={{
                            ml: 1, flex: 1, fontSize: 14, fontWeight: 500,
                        }}
                        placeholder="Enter username"
                        inputProps={{ 'aria-label': 'search Yway' }}
                    />
                    <IconButton type="submit" sx={{ p: '3px' }} aria-label="search">
                        <SearchRounded sx={{ fill: theme.palette.grey['500'] }} />
                    </IconButton>
                </Paper> */}
                <CommonTitle title='FRIEND REQUESTS' />
                <Grid container justifyContent='flex-start' mb={1}>
                    {friendRequests.length === 0 ?
                        <Typography>No friend requests</Typography> : friendRequests.map((data) => <NotificationCard
                            key={data._id} _id={data._id} icon={data.avatar} name={data.username} type='friend request' />)}

                </Grid>
            </> : null
            }
                <CommonTitle title='FRIENDS' />
                <Grid container justifyContent='flex-start' mb={1}>
                    {friends.length === 0 ? <Typography>No friends</Typography> : friends.map((data) => <FriendCard
                        key={data._id}{...data} />)}

                </Grid></> : <Typography> {`This user's profile is private.`} </Typography>}

        </Grid>
    );
}

// const friends = [
//     {
//         _id: 1,
//         avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
//         username: 'SoekindoGName123',
//     },
//     {
//         _id: 2,
//         avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
//         username: 'SoekindoGName123',
//     },
//     {
//         _id: 3,
//         avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
//         username: 'SoekindoGName123',
//     },
//     {
//         _id: 4,
//         avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
//         username: 'SoekindoGName123',
//     },
//     {
//         _id: 5,
//         avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
//         username: 'SoekindoGName123',
//     },
//     {
//         _id: 6,
//         avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
//         username: 'SoekindoGName123',
//     },
//     {
//         _id: 7,
//         avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
//         username: 'SoekindoGName123',
//     },
//     {
//         _id: 8,
//         avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
//         username: 'SoekindoGName123',
//     }
// ];
//
// const friendRequests = [
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
//
// ]