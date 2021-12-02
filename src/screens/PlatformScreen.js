import React from 'react'
import { Grid, Stack, Avatar, Box, Button, CircularProgress } from '@mui/material'
import MiniLeaderboard from '../components/PlatformScreen/MiniLeaderboard'
import { QuizCard } from '../components';
import { useParams, useHistory } from 'react-router-dom';
import usePrivilegedQuery from '../hooks/usePrivilegedQuery';
import { GET_PLATFORM_SUMMARY } from '../controllers/graphql/platform-queries';
import SettingsIcon from '@mui/icons-material/Settings';
import { Typography } from "@mui/material";
import Header from '../components/PlatformScreen/Header';
import ModeratorQuizCard from '../components/PlatformScreen/ModeratorQuizCard';

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
    const history = useHistory();

    const { data: platformData, error, loading } = usePrivilegedQuery(GET_PLATFORM_SUMMARY, { variables: { title: platformName } });

    // const { data: moreData } = usePrivilegedQuery(GET_PLATFORM_BY_ID, { variables: { id: "618c41ee4d94eb6ad380f8f1" } });
    // if (moreData){
    //     console.log(moreData)
    // }

    let platformSummary;
    if (platformData) {
        platformSummary = platformData.getPlatformSummary;
    }

    const gotoPlatformSettings = () => {
        history.push(`/platformSettings/${platformName}`)
    }

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Box style={{position: "relative"}}>
                        <Header platformName={platformName}/>
                        <Button sx={{ position: "absolute", right: "10px", bottom: "10px" }} onClick={gotoPlatformSettings} >
                            <SettingsIcon sx={{ color: "white" }} />
                        </Button>
                    </Box>
                    <Box style={{ backgroundColor: "#ededed" }}>
                        <Stack sx={{ padding: "2rem", marginLeft: "35%" }} direction="row" spacing={5}>
                            <Box style={{ whiteSpace: "nowrap" }}>
                            <Typography>
                                {`${platformSummary ? platformSummary.favorites : '?'} Favorites`}
                            </Typography>
                            </Box>
                            <Box style={{ whiteSpace: "nowrap" }}>
                                <Typography>
                                    {`${platformSummary ? platformSummary.numQuizzes : '?'} Quizzes`}
                                </Typography>
                            </Box>
                            <Box style={{ whiteSpace: "nowrap" }}>
                                <Typography>
                                    {`${platformSummary ? platformSummary.numQuestions : '?'} Questions`}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item container xs={8} spacing={0}>
                    {platformSummary &&
                        (platformSummary.quizzesInfo.length ?
                            platformSummary.quizzesInfo.map((data) =>
                                <ModeratorQuizCard key={data.id} {...data} />) :
                            <Box sx={{ marginTop: "100px", marginLeft: "100px" }}>
                                <Typography sx={{ width: 250 }}>
                                    No Quizzes to Display
                                </Typography>
                            </Box>
                        )}
                </Grid>
                <Grid item xs={3} sx={{ marginTop: "2rem" }}>
                    <MiniLeaderboard width="350px" platformName={platformName}/>
                </Grid>
            </Grid>
        </>
    )
}
