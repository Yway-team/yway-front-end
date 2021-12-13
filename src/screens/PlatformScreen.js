import React, { useState } from 'react'
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
import FavoriteButton from '../components/PlatformScreen/FavoriteButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

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

    const { data: platformData, refetch, error, loading } = usePrivilegedQuery(GET_PLATFORM_SUMMARY, { variables: { title: platformName } });

    let platformSummary;
    let authorized = false;
    if (platformData) {
        console.log(platformData)
        platformSummary = platformData.getPlatformSummary;
        authorized = platformData.getPlatformSummary.moderator
    }


    // Collapse and Expand the Mini Leaderboard
    const [open, setOpen] = useState(true)
    const toggleOpen = () => {
        setOpen(prev => !prev)
    }

    return (
        <>
            {platformSummary ? <Header platformName={platformName}
                thumbnailImg={platformSummary.thumbnailImg}
                bannerImg={platformSummary.bannerImg}
                favorites={platformSummary.favorites}
                numQuestions={platformSummary.numQuestions}
                numQuizzes={platformSummary.numQuizzes}
                description={platformSummary.description}
                tags={platformSummary.tags}
                color={platformSummary.color}
                id={platformSummary._id}
                authorized={authorized}
            /> : null}
            {platformSummary &&
                <Grid container spacing={0}>
                    {/* <Button sx={{ position: "absolute", right: "10px", bottom: "10px" }} onClick={gotoPlatformSettings} >
                            <SettingsIcon sx={{ color: "white" }} />
                        </Button>
                        {platformSummary ? <FavoriteButton _id={platformSummary._id} title={platformName} sx={{ position: "absolute", right: "50px", bottom: "10px" }} /> : <></>} */}

                    {/* <Box style={{ backgroundColor: "#ededed" }}>
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
                    </Box> */}
                    {/* <Box style={{ minHeight: "30px", margin: "30px" }}>
                        <Typography>
                            {platformSummary ? platformSummary.description : ""}
                        </Typography>
                    </Box> */}

                    <Grid item container xs={open ? 8.7 : 11.6} spacing={0} mt='1rem'>
                        {platformSummary &&
                            (platformSummary.quizzesInfo.length ?
                                platformSummary.quizzesInfo.map((data) =>
                                    <ModeratorQuizCard authorized={authorized} key={data._id} {...data} platformId={platformSummary._id} refetch={refetch} />) :
                                <Box sx={{ marginTop: "100px", marginLeft: "100px" }} key={1}>
                                    <Typography sx={{ width: 250 }}>
                                        No Quizzes to Display
                                    </Typography>
                                </Box>
                            )}
                    </Grid>
                    <Grid item xs={open ? 3.3 : 0.4} sx={{ marginTop: "2rem", position: 'relative' }}>
                        <Button onClick={toggleOpen} sx={{ position: 'absolute', left: -80, top: -4 }}>
                            {open ?
                                <KeyboardArrowRightIcon />
                                : <KeyboardArrowLeftIcon />
                            }
                        </Button>
                        <Box sx={{ display: open ? "block" : "none" }}>
                            <MiniLeaderboard width="auto" platformName={platformName} leaderboardEntries={platformSummary ? platformSummary.leaderboardEntries : null} />
                        </Box>
                    </Grid>
                </Grid>}

        </>
    )
}
