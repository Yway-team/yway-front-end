import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Dialog, Divider, Grid, Tab, Tabs, Typography, CircularProgress } from '@mui/material';
import { Edit, Settings, PersonAddAlt1Outlined, Add, Remove, Check } from '@mui/icons-material';
import ProfilePrivacy from './ProfilePrivacy';
import ProfileSettings from './ProfileSettings';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';
import { Overview, Achievements, Friends, History, MyQuizzes, MyPlatforms, ConfirmationDialog } from '../components';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { GET_USER_INFO } from '../controllers/graphql/user-queries';
import { globalState } from "../state/UserState";
import { SEND_FRIEND_REQUEST, ACCEPT_FRIEND_REQUEST, DECLINE_FRIEND_REQUEST, REMOVE_FRIEND } from "../controllers/graphql/user-mutations";

export default function ProfileScreen() {
    const { userId } = useParams();
    const currentUser = useReactiveVar(globalState);
    const isOwn = (userId === currentUser._id);
    const history = useHistory();
    const routes = ['/overview', '/achievements', '/quizzes', '/platforms',
        // '/history'
        '/friends'];
    const tab = findTab();
    const [privacySettingsOpen, setPrivacySettingsOpen] = useState(false);
    const [profileSettingsOpen, setProfileSettingsOpen] = useState(false);
    // const [acceptFriendRequestOpen, setAcceptFriendRequestOpen] = useState(false);
    // const [declineFriendRequestOpen, setDeclineFriendRequestOpen] = useState(false);
    // const [acceptFriendRequestOpen, setAcceptFriendRequestOpen] = useState(false);
    const [removeFriendOpen, setRemoveFriendOpen] = useState(false);
    const { loading, error, data } = useQuery(GET_USER_INFO, { variables: { userId: userId } });
    const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, { variables: { receiverId: userId }, refetchQueries: [GET_USER_INFO] });
    const [acceptFriendRequest] = useMutation(ACCEPT_FRIEND_REQUEST, { variables: { receiverId: userId }, refetchQueries: [GET_USER_INFO] });
    const [declineFriendRequest] = useMutation(DECLINE_FRIEND_REQUEST, { variables: { receiverId: userId }, refetchQueries: [GET_USER_INFO] });
    const [removeFriend] = useMutation(REMOVE_FRIEND, { variables: { friendId: userId }, refetchQueries: [GET_USER_INFO] });
    let userInfo = null;
    if (loading) {
        return (
            <Grid container justifyContent='center' alignItems='center' sx={{ height: '40vh', width: '100%' }}>
                <CircularProgress variant='indeterminate' color='primary' />
            </Grid>
        );
    }

    if (error)
        return `Error! ${error}`;

    if (data) {
        userInfo = data.getUserInfo;
        console.log(userInfo)
        console.log('friend status ' + userInfo.friendStatus);
    }

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

    const handleAddFriend = async () => {
        sendFriendRequest({ variables: { receiverId: userId } });
    }

    const handleAcceptFriend = async () => {
        acceptFriendRequest({ variables: { senderId: userId } });
    }

    const handleDeclineFriend = async () => {
        declineFriendRequest({ variables: { senderId: userId } });
    }

    const handleRemoveFriend = async () => {
        console.log('handle remove friend');
        removeFriend({ variables: { friendId: userId } });
    }

    const handleCancelFriendRequest = () => {

    }

    function findTab() {
        var currentPath = history.location.pathname;
        for (let i = 0; i < routes.length; i++) {
            if (currentPath.endsWith(routes[i])) {
                return i;
            }
        }
        return 0;
    }


    return (
        <>
            <Grid container justifyContent='center' alignItems='center'>
                <Grid flexDirection='column' sx={{ maxWidth: '1050px' }}>
                    <Grid container justifyContent='center' sx={{ height: "150px", overflow: "hidden", }}>
                        <img alt='cover' src={userInfo.bannerImg || 'https://cse416-content.s3.us-east-2.amazonaws.com/profile+cover+photo.png'} sx={{ objectFit: 'fill' }} />
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
                    <Box container sx={{ justifyContent: 'space-between', alignItems: 'center', position: "relative" }}>
                        {isOwn ?
                            <Box item sx={{ position: "absolute", right: "0px", top: "0px", zIndex: "2" }}>
                                <Button variant="text" startIcon={<Settings />} sx={{ mr: 1 }}
                                    onClick={handleClickPrivacySettingsOpen}>
                                    Settings
                                </Button>
                                <Button variant="contained" startIcon={<Edit />} onClick={handleClickProfileSettingsOpen}>
                                    Edit Profile
                                </Button>
                            </Box> :
                            <Box item sx={{ position: "absolute", right: "0px", top: "0px", zIndex: "2" }}>
                                {
                                    userInfo.friendStatus === 'none' ?
                                        <Button variant="contained" startIcon={<PersonAddAlt1Outlined />} onClick={handleAddFriend}>
                                            ADD FRIEND
                                        </Button> : <></>
                                }
                                {
                                    userInfo.friendStatus === 'received' ?
                                        <>
                                            <Button variant="contained" startIcon={<Add />} onClick={handleAcceptFriend}>
                                                ACCEPT
                                            </Button>
                                            <Button variant="outlined" startIcon={<Remove />} onClick={handleDeclineFriend} sx={{ ml: 2 }}>
                                                DECLINE
                                            </Button>
                                        </> : <></>
                                }
                                {
                                    userInfo.friendStatus === 'sent' ?
                                        <Button variant="contained" disabled={true} startIcon={<Check />} >
                                            FRIEND REQUEST SENT
                                        </Button> : <></>
                                }
                                {
                                    userInfo.friendStatus === 'friend' ?
                                        <Button variant="contained" startIcon={<Check />} onClick={() => { setRemoveFriendOpen(true) }}>
                                            FRIENDS
                                        </Button> : <></>
                                }
                            </Box>}
                    </Box>
                    {userInfo.privacySettings === "public" || isOwn ?
                        <>
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
                                {/*<Tab label="History"{...a11yProps(4)} />*/}
                                <Tab label="Friends" {...a11yProps(5)} />

                            </Tabs>

                            <Box>
                                <Switch>
                                    <Route exact path='/user/:userId'>
                                        <Overview userId={userId} isOwn={isOwn} />
                                    </Route>
                                    <Route path={`/user/:userId/overview`}>
                                        <Overview userId={userId} isOwn={isOwn} />
                                    </Route>
                                    <Route exact path={`/user/:userId/achievements`}>
                                        <Achievements userId={userId} />
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
                                        <Friends userId={userId} isOwn={isOwn} />
                                    </Route>
                                </Switch>
                            </Box>
                        </> :
                        <Typography sx={{ ml: "40%", mt: "100px" }}> {`This user's profile is private.`} </Typography>}

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
            <ConfirmationDialog
                open={removeFriendOpen}
                handleClose={() => { setRemoveFriendOpen(false); }}
                title='REMOVE FRIEND'
                content={`Are you sure you want to remove this friend? `}
                yesText='REMOVE FRIEND'
                yesCallback={() => { handleRemoveFriend(); }}
                noText='CANCEL'
                noCallback={() => { setRemoveFriendOpen(false); }}
            />
            {/* <ConfirmationDialog
                open={acceptFriendRequestOpen}
                handleClose={() => { setAcceptFriendRequestOpen(false); }}
                title='ACCEPT FRIEND REQUEST'
                content={`Are you sure you want to accept this friend request? `}
                yesText='REMOVE FRIEND REQUEST'
                yesCallback={handleCancelFriendRequest}
                noText='CANCEL'
                noCallback={() => { setAcceptFriendRequestOpen(false); }}
            /> */}
        </>
    )
}


function a11yProps(index) {
    return {
        id: `user-tab-${index}`,
        'aria-controls': `user-tabpanel-${index}`,
    };
}

