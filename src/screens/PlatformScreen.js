import React from 'react'
import { Grid, Stack, Avatar, Box } from '@mui/material'
import MiniLeaderboard from '../components/PlatformScreen/MiniLeaderboard'
import { QuizCard } from '../components';

import { useParams } from 'react-router-dom';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_USER_INFO } from '../controllers/graphql/user-queries';
import { globalState } from "../state/UserState";

const quizzes = [
    {
        id: 1,
        title: 'How much do you know your chinese cuisine',
        description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorpe eget nulla facilisi etia dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis",
        bannerImg: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        numQuestions: 10,
        ownerUsername: 'yourMama101',
        ownerAvatar: "https://i.pravatar.cc/300",
        rating: 4.5,
        createdAt: '2 months ago',
        platformThumbnail: "https://i.pravatar.cc/300",
        platformName: 'Mcdonal123',
    },
    {
        id: 2,
        title: 'How much do you know your chinese cuisine',
        description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorpe eget nulla facilisi etia dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis",
        bannerImg: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        numQuestions: 10,
        ownerUsername: 'yourMama101',
        ownerAvatar: "https://i.pravatar.cc/300",
        rating: 4.5,
        createdAt: '2 months ago',
        platformThumbnail: "https://i.pravatar.cc/300",
        platformName: 'Mcdonal123',
    },
    {
        id: 3,
        title: 'How much do you know your chinese cuisine',
        description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorpe eget nulla facilisi etia dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis",
        bannerImg: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        numQuestions: 10,
        ownerUsername: 'yourMama101',
        ownerAvatar: "https://i.pravatar.cc/300",
        rating: 4.5,
        createdAt: '2 months ago',
        platformThumbnail: "https://i.pravatar.cc/300",
        platformName: 'Mcdonal123',
    },
    {
        id: 4,
        title: 'How much do you know your chinese cuisine',
        description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorpe eget nulla facilisi etia dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis",
        bannerImg: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        numQuestions: 10,
        ownerUsername: 'yourMama101',
        ownerAvatar: "https://i.pravatar.cc/300",
        rating: 4.5,
        createdAt: '2 months ago',
        platformThumbnail: "https://i.pravatar.cc/300",
        platformName: 'Mcdonal123',
    },
    {
        id: 5,
        title: 'How much do you know your chinese cuisine',
        description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorpe eget nulla facilisi etia dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis",
        bannerImg: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        numQuestions: 10,
        ownerUsername: 'yourMama101',
        ownerAvatar: "https://i.pravatar.cc/300",
        rating: 4.5,
        createdAt: '2 months ago',
        platformThumbnail: "https://i.pravatar.cc/300",
        platformName: 'Mcdonal123',
    },
    {
        id: 6,
        title: 'How much do you know your chinese cuisine',
        description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorpe eget nulla facilisi etia dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis",
        bannerImg: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        numQuestions: 10,
        ownerUsername: 'yourMama101',
        ownerAvatar: "https://i.pravatar.cc/300",
        rating: 4.5,
        createdAt: '2 months ago',
        platformThumbnail: "https://i.pravatar.cc/300",
        platformName: 'Mcdonal123',
    },
];

export default function PlatformScreen() {
    const {platformId} = useParams()
    const currentUser = useReactiveVar(globalState);

    

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Box style={{ height: "300px", position: "relative", display: "flex", alignItems: "flex-end" }}>
                        <Box style={{ height: "100%", width: "100%", overflow: "hidden", position: "absolute", top: "0px", zIndex: "-1" }}>
                            <img style={{ width: "100%" }} alt='cover' src="https://cse416-content.s3.us-east-2.amazonaws.com/118-1000x500.jpg" />
                            <div style={{position:"absolute", top: "0", left: "0", width: "100%", height:"100%", backgroundColor:"#cfcfcf50"}}></div>
                        </Box>
                        <Avatar alt="avatar" src="https://i.picsum.photos/id/547/400/400.jpg?hmac=XHYLl2DzvVBGB_o4uGfgh_3RVOGd5ZMCq-OMn9m8IHE"
                            sx={{
                                height: 250,
                                width: 250,
                                border: '0.2rem solid',
                                borderColor: 'common.white',
                                marginLeft: "5%",
                                display: "relative",
                                bottom: "-30%"
                            }}
                            imgProps={{ style: { borderRadius: '50%' } }} />
                        <h2 style={{ color: "white", fontSize: "50px", marginLeft: "30px" }}>All About Mountaineering</h2>

                        <Box sx={{ display: "flex", alignItems: 'flex-end', position: "absolute", left: "0px", bottom: "0px", width: "100%" }}>
                        </Box>
                    </Box>
                    <Box style={{ backgroundColor: "#ededed" }}>
                        <Stack sx={{ padding: "2rem", marginLeft: "35%", color:"#474747", fontSize:"15px" }} direction="row" spacing={5}>
                            <Box style={{ whiteSpace: "nowrap" }}>1.35 Million Followers</Box>
                            <Box style={{ whiteSpace: "nowrap" }}>234 Quizzes</Box>
                            <Box style={{ whiteSpace: "nowrap" }}>2349 Questions</Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item container xs={9} spacing={0}>
                    {quizzes ?
                    quizzes.map((data) =>

                        <QuizCard key={data.id} {...data} />) :
                        <h2>No Quizzes to Display</h2>
                    }
                </Grid>
                <Grid item xs={3} sx={{marginTop: "2rem"}}>
                    <MiniLeaderboard width="350px" />
                </Grid>
            </Grid>
        </>
    )
}
