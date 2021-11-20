import React from 'react'
import { Grid, Stack, Avatar, Box } from '@mui/material'
import MiniLeaderboard from '../components/PlatformScreen/MiniLeaderboard'
import { QuizCard } from '../components';
import { useParams } from 'react-router-dom';
import usePrivilegedQuery from '../hooks/usePrivilegedQuery';
import { GET_PLATFORM_SUMMARY } from '../controllers/graphql/platform-queries';

/*const quizzes = [
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
];*/

export default function PlatformScreen() {
    const { platformName } = useParams();
    const { data: platformData } = usePrivilegedQuery(GET_PLATFORM_SUMMARY, { variables: { title: platformName } });
    let platformSummary;
    if (platformData) {
        platformSummary = platformData.getPlatformSummary;
        console.log(platformSummary.quizzesInfo);
    }
    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Box style={{ height: "300px", position: "relative", display: "flex", alignItems: "flex-end" }}>
                        <Box style={{ height: "100%", width: "100%", overflow: "hidden", position: "absolute", top: "0px", zIndex: "-1" }}>
                            <img style={{ width: "100%" }} alt='cover' src={platformSummary ? platformSummary.bannerImg : null} />
                        </Box>
                        <Avatar alt="avatar" src={platformSummary ? platformSummary.thumbnailImg : null}
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
                        <h2 style={{ color: "black", fontSize: "50px" }}>{platformName}</h2>

                        <Box sx={{ display: "flex", alignItems: 'flex-end', position: "absolute", left: "0px", bottom: "0px", width: "100%" }}>
                        </Box>
                    </Box>
                    <Box style={{ backgroundColor: "#ededed" }}>
                        <Stack sx={{ padding: "2rem", marginLeft: "35%" }} direction="row" spacing={5}>
                            <Box style={{ whiteSpace: "nowrap" }}>{`${platformSummary ? platformSummary.favorites : '?'} Favorites`}</Box>
                            <Box style={{ whiteSpace: "nowrap" }}>{`${platformSummary ? platformSummary.numQuizzes : '?'} Quizzes`}</Box>
                            <Box style={{ whiteSpace: "nowrap" }}>{`${platformSummary ? platformSummary.numQuestions : '?'} Questions`}</Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item container xs={9} spacing={0}>
                    {platformSummary &&
                    (platformSummary.quizzesInfo.length ?
                    platformSummary.quizzesInfo.map((data) =>
                        <QuizCard key={data.id} {...data} />) :
                        <h2>No Quizzes to Display</h2>)
                    }
                </Grid>
                <Grid item xs={3} sx={{marginTop: "2rem"}}>
                    <MiniLeaderboard width="350px" />
                </Grid>
            </Grid>
        </>
    )
}
