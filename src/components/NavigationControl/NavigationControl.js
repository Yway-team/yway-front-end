import {
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    Box,
    List,
    ListItemText,
    ListItemIcon,
    Button,
    Grid,
    Paper,
    InputBase,
    Avatar
} from '@mui/material';
import {
    Menu,
    MenuOpen,
    AutoAwesome,
    QuizOutlined,
    TrendingUp,
    History,
    PostAddOutlined,
    GroupAddRounded,
    Source,
    People,
    DynamicForm,
    TungstenRounded,
    Bolt,
    SearchRounded
} from '@mui/icons-material';
import ListItem, { listItemClasses } from "@mui/material/ListItem";
import { useHistory } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { Fragment, useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { LOGIN } from '../../controllers/graphql/user-mutations.js';
import { useMutation } from '@apollo/client';
import { globalState } from '../../state/UserState';
import { useReactiveVar } from "@apollo/client";
import ProfileMenu from './ProfileMenu';
import NotificationsPopUp from './NotificationsPopUp';
import logo from '../../images/logo.svg';


function NavigationControl(props) {
    // This component controls Top App Bar and Left Navigation Bar under one single state. 
    // It also takes routes as props to maintain global state at all time.
    // App Bar reacts to logged in state. 
    // Drawer reacts to routes and changes its active tab accordingly.
    // Main section is for displaying main pages. 

    const user = useReactiveVar(globalState);
    const theme = useTheme();
    const drawerWidth = 240;
    const [open, setOpen] = useState(true);
    const [login] = useMutation(LOGIN);
    const history = useHistory();
    const [currentURL, setcurrentURL] = useState(history.location.pathname);

    const exploreTabLists = [
        ['Highlights', <AutoAwesome sx={{ fontSize: 15 }} />, '/highlights'],
        ['Top Platforms', <QuizOutlined sx={{ fontSize: 19 }} />, '/platform'],
        ['Top quizzes', <TrendingUp sx={{ fontSize: 19 }} />, '/quiz'],
        ['History', <History sx={{ fontSize: 19 }} />, `/user/${user._id}/history`],
    ];

    const createTabLists = [
        ['Create quiz', <PostAddOutlined sx={{ fontSize: 20 }} />, '/quiz/create'],
        ['Create platform', <GroupAddRounded sx={{ fontSize: 20 }} />, '/platform/create'],
        ['Drafts', <Source sx={{ fontSize: 18 }} />, `/drafts`],
        ['My platforms', <People sx={{ fontSize: 17 }} />, `/user/${user._id}/platforms`],
        ['My quizzes', <DynamicForm sx={{ fontSize: 16 }} />, `/user/${user._id}/quizzes`],
    ];

    const toggleDrawer = () => {
        setOpen(!open);
    }

    const handleNextRoute = (newRoute) => {
        history.push(newRoute);
    }

    const checkUrl = (url) => {
        if (currentURL === '/' && url === '/highlights') {
            return true;
        }
        return currentURL.endsWith(url);
    }

    const handleLogin = async (response) => {
        const authResponse = response.getAuthResponse();
        const idToken = authResponse.id_token;
        const { data } = (await login({ variables: { idToken: idToken } }));
        if (data) {
            globalState({
                loggedin: true,
                ...data.login,
            });
        }
    }

    useEffect(() => {
        return history.listen((location) => {
            console.log(`You changed the page to: ${location.pathname}`);
            setcurrentURL(location.pathname.toString());
        })
    }, [history])

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            flexGrow: 1,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginTop: '64px',
            marginLeft: `0px`,
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: `${drawerWidth}px`,
            }),
        }),
    );

    const title = (title) =>
        <Typography sx={{
            fontWeight: '700',
            fontSize: 16,
            color: theme.palette.primary.main,
            my: 2,
            marginLeft: '22px'
        }}>{title}
        </Typography>;

    const tabTile = (tabName, icon, url, index) => {
        var isActive = checkUrl(url);
        return (<ListItem key={index} button selected={isActive} onClick={() => handleNextRoute(url)}
            sx={{ display: 'flex', alignItems: 'center', paddingLeft: '22px', py: '7px', }}>
            <ListItemIcon sx={{ minWidth: 30 }}>
                {icon}
            </ListItemIcon>
            <ListItemText
                disableTypography={true} primary={tabName}>
            </ListItemText>
        </ListItem>);
    };
    //favorite.title, favorite.thumbnailImg, `/platform/${favorite.title}`, index
    const favTile = (tabName, img, url, index) => {
        var isActive = checkUrl(url);
        return (<ListItem key={index} button selected={isActive} onClick={() => handleNextRoute(url)}
            sx={{ display: 'flex', alignItems: 'center', paddingLeft: '22px', py: '7px', }}>
            <Avatar alt='fav-platform-thumbnail' src={img} sx={{ width: 27, height: 27, mr: '8px' }} />
            <ListItemText
                disableTypography={true} primary={tabName}>
            </ListItemText>
        </ListItem>);
    };

    return (
        <Fragment>
            <AppBar position="fixed" sx={{
                zIndex: (theme) => theme.zIndex.drawer + 2,
                background: theme.palette.common.white,
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)'
            }}>
                <Toolbar style={{ padding: 0 }}>
                    <Grid container justifyContent='space-between'>
                        <Grid container item xs={3} alignItems='center' justifyContent='flex-start'>
                            <IconButton onClick={toggleDrawer} sx={{ mx: '14px', }}>
                                {
                                    open ? <MenuOpen sx={{ fill: theme.palette.grey['500'] }} /> :
                                        <Menu sx={{ fill: theme.palette.grey['500'] }} />
                                }
                            </IconButton>
                            <img src={logo} style={{ height: 36 }} alt={"logo"} />
                        </Grid>
                        <Grid container item xs={5} alignItems='center' justifyContent='center' sx={{
                            [`&:focus-within`]: {
                                '& svg': { fill: theme.palette.primary.main }
                            }
                        }}>
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
                                    placeholder="Search Yway"
                                    inputProps={{ 'aria-label': 'search Yway' }}
                                />
                                <IconButton type="submit" sx={{ p: '3px' }} aria-label="search">
                                    <SearchRounded sx={{ fill: theme.palette.grey['500'] }} />
                                </IconButton>
                            </Paper>
                        </Grid>
                        <Grid container item xs={3} justifyContent='flex-end' alignItems='center'>
                            {user.loggedin ?
                                <><NotificationsPopUp /> <ProfileMenu /></>
                                : <GoogleLogin
                                    clientId={process.env.REACT_APP_CLIENT_ID}
                                    isSignedIn={true}
                                    render={renderProps => (
                                        <Button onClick={renderProps.onClick}
                                            sx={{
                                                background: theme.palette.primary.main,
                                                mx: '22px',
                                                px: 3,
                                                color: 'common.white',
                                                "&:hover": {
                                                    backgroundColor: theme.palette.primary.light,
                                                    color: theme.palette.primary.main,
                                                }
                                            }
                                            }>SIGN IN</Button>
                                    )}
                                    onSuccess={handleLogin}
                                    onFailure={() => {
                                    }}
                                    cookiePolicy={'single_host_origin'} />}

                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {
                user.loggedin ?
                    <Grid container justifyContent='flex-end' sx={{ zIndex: theme.zIndex.drawer, position: 'fixed' }}>
                        <Grid item container direction='row' sx={{
                            backgroundColor: theme.palette.primary.main,
                            height: '36px',
                            width: '150px',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            pl: 1,
                            borderRadius: '0px 0px 0px 14px',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)'
                        }}>
                            <Grid container item xs={6} direction='row' alignItems='center' justifyContent='center'>
                                <Typography sx={{
                                    fontWeight: '700',
                                    fontSize: 15,
                                    color: theme.palette.common.white
                                }}>
                                    {user.creatorPoints}
                                </Typography>
                                <TungstenRounded sx={{ fill: theme.palette.common.white, fontSize: 20, ml: 0.4 }} />
                            </Grid>

                            <Grid container item xs={6} direction='row' alignItems='center' justifyContent='center'>
                                <Typography sx={{
                                    fontWeight: '700',
                                    fontSize: 15,
                                    color: theme.palette.common.white
                                }}>
                                    {user.playPoints}
                                </Typography>
                                <Bolt sx={{ fill: theme.palette.common.white, fontSize: 21, ml: 0.3 }} />
                            </Grid>

                        </Grid>
                    </Grid> : <Fragment></Fragment>
            }
            <Drawer
                variant="persistent"
                open={open}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 240,
                        boxSizing: 'border-box',
                        boxShadow: '2px 0px 6px rgba(0, 0, 0, 0.14)',
                        border: 'none'
                    },
                }}>
                <Box sx={{ overflow: 'auto', marginTop: 8 }}>
                    <List sx={{
                        [`.${listItemClasses.root}`]: {
                            color: theme.palette.grey['500'],
                            letterSpacing: '0.15px',
                            lineHeight: '24px',
                            fontSize: '14px',
                            fontWeight: 600,
                            fontFamily: "'Montserrat', sans-serif",
                            "& svg": {
                                fill: theme.palette.grey['500'],
                            }
                        },
                        [`& .active, & .Mui-selected, `
                        ]: {
                            color: theme.palette.primary.main,
                            "& svg": {
                                fill: theme.palette.primary.main,
                            }
                        }
                    }}>

                        {user.loggedin ?
                            <Fragment>
                                {title('EXPLORE')}
                                {exploreTabLists.map(
                                    (data, index) => tabTile(...data, index)
                                )}
                                {title('CREATE')}
                                {createTabLists.map(
                                    (data, index) => tabTile(...data, index)
                                )}
                                {title('FAVORITES')}
                                {user.favorites ? user.favorites.map(
                                    (favorite, index) => favTile(favorite.title, favorite.thumbnailImg, `/platform/${favorite.title}`, index)
                                ) : null}
                            </Fragment> :
                            <Fragment> {title('EXPLORE')}
                                {exploreTabLists.slice(0, -1).map(
                                    (data, index) => tabTile(...data, index)
                                )}  </Fragment>
                        }

                    </List>
                </Box>
            </Drawer>
            <Main open={open}>
                {props.switch}
            </Main>
        </Fragment >
    );
}

export default NavigationControl;
