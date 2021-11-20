import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Dialog, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import { Edit, Settings, } from '@mui/icons-material';
import ProfilePrivacy from './ProfilePrivacy';
import ProfileSettings from './ProfileSettings';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';
import { Overview, Achievements, Friends, History, MyQuizzes, MyPlatforms } from '../components';
import { useQuery, useReactiveVar } from '@apollo/client';
import { GET_USER_INFO } from '../controllers/graphql/user-queries';
import { globalState } from "../state/UserState";

export default function ProfileScreen() {

    const { userId } = useParams();
    const currentUser = useReactiveVar(globalState);
    const isOwn = (userId === currentUser._id) ? true : false;
    const history = useHistory();
    const routes = ['/overview', '/achievements', '/quizzes', '/platforms', '/history', '/friends'];
    const tab = findTab();
    const [privacySettingsOpen, setPrivacySettingsOpen] = useState(false);
    const [profileSettingsOpen, setProfileSettingsOpen] = useState(false);


    const handleClickPrivacySettingsOpen = () => {
        setPrivacySettingsOpen(true);
    };
    const handlePrivacySettingsClose = () => {
        setPrivacySettingsOpen(false);
    };

    const handleClickProfileSettingsOpen = () => {
        setProfileSettingsOpen(true);
    };
    const handleProfileSettingsClose = () => {
        setProfileSettingsOpen(false);
    };

    const handleChange = (event, newValue) => {
        history.push('/user/' + userId + routes[newValue]);

    };

    function findTab() {
        var currentPath = history.location.pathname;
        for (let i = 0; i < routes.length; i++) {
            if (currentPath.endsWith(routes[i])) {
                return i;
            }
        }
        return 0;
    }


    useEffect(() => {
        console.log('Profile Screen mounted');
    }, []);


    const { loading, error, data } = useQuery(GET_USER_INFO, { variables: { userId: userId } });
    let userInfo = null;
    if (loading) {
        return ('loading');
    }

    if (error)
        return `Error! ${error}`;

    if (data) {
        userInfo = data.getUserInfo;
    }

    return (
        <>
            <Grid container justifyContent='center' alignItems='center'>
                <Grid flexDirection='column' sx={{ maxWidth: '1050px' }}>
                    <Grid container justifyContent='center' sx={{ height: "150px", overflow: "hidden", }}>
                        <img alt='cover' src="https://picsum.photos/1000" sx={{ objectFit: 'fill' }} />
                    </Grid>
                    <Grid item container justifyContent='center' flexDirection='column' alignItems='center'>
                        <Avatar alt="avatar" src={userInfo ? userInfo.avatar : null /*"https://i.pravatar.cc/300"*/}
                            sx={{
                                mt: -12,
                                height: 130,
                                width: 130,
                                border: '0.2rem solid',
                                borderColor: 'common.white'
                            }}
                            imgProps={{ style: { borderRadius: '50%', objectFit: 'fill' } }} />
                        <Typography sx={{
                            fontWeight: 700,
                            fontSize: 25,
                            color: 'common.black'
                        }}>
                            {userInfo ? userInfo.username : null}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: 14,
                                mt: 1
                            }}>
                            {userInfo ? userInfo.bio : null}
                        </Typography>
                        <Divider flexItem sx={{ mt: 3 }} />
                    </Grid>
                    <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Tabs
                            value={tab}
                            onChange={handleChange}
                            aria-label="user tabs"
                            textColor='primary'
                            indicatorColor='primary'
                            sx={{
                                [`& .MuiTab-root`]: {
                                    fontWeight: 600,
                                }
                            }}
                        >
                            <Tab label="Overview" {...a11yProps(0)} />
                            <Tab label="Achievements" {...a11yProps(1)} />
                            <Tab label={`${isOwn ? 'My ' : ''}Quizzes`}{...a11yProps(2)} />
                            <Tab label={`${isOwn ? 'My ' : ''}Platforms`} {...a11yProps(3)} />
                            <Tab label="History"{...a11yProps(4)} />
                            <Tab label="Friends" {...a11yProps(5)} />

                        </Tabs>
                        <Grid item>
                            <Button variant="text" startIcon={<Settings />} sx={{ mr: 1 }}
                                onClick={handleClickPrivacySettingsOpen}>
                                Settings
                            </Button>
                            <Button variant="contained" startIcon={<Edit />} onClick={handleClickProfileSettingsOpen}>
                                Edit Profile
                            </Button>
                        </Grid>
                    </Grid>


                    <Box>
                        <Switch>
                            <Route exact path='/user/:userId'>
                                <Overview />
                            </Route>
                            <Route path={`/user/:userId/overview`}>
                                <Overview />
                            </Route>
                            <Route exact path={`/user/:userId/achievements`}>
                                <Achievements />
                            </Route>
                            <Route exact path={`/user/:userId/quizzes`}>
                                <MyQuizzes userId={userId} isOwn={isOwn} username={userInfo?.username} />
                            </Route>
                            <Route exact path={`/user/:userId/platforms`}>
                                <MyPlatforms userId={userId} isOwn={isOwn} username={userInfo?.username} />
                            </Route>
                            <Route exact path={`/user/:userId/history`}>
                                <History userId={userId} />
                            </Route>
                            <Route exact path={`/user/:userId/friends`}>
                                <Friends userId={userId} />
                            </Route>
                        </Switch>
                    </Box>

                </Grid>
            </Grid>


            <Dialog open={privacySettingsOpen} onClose={handlePrivacySettingsClose}
                aria-labelledby="privacy-settings-dialog">
                <ProfilePrivacy userInfo={userInfo} handleClose={handlePrivacySettingsClose} />
            </Dialog>

            <Dialog open={profileSettingsOpen} onClose={handleProfileSettingsClose}
                aria-labelledby="profile-settings-dialog">
                <ProfileSettings userInfo={userInfo} handleClose={handleProfileSettingsClose} />
            </Dialog>
        </>
    )
}


function a11yProps(index) {
    return {
        id: `user-tab-${index}`,
        'aria-controls': `user-tabpanel-${index}`,
    };
}

