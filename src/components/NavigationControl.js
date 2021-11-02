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
} from '@mui/material';

import ListItem, { listItemClasses } from "@mui/material/ListItem";
import { useHistory } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { Menu, AutoAwesome, QuizOutlined, TrendingUp, History, PostAddOutlined, GroupAddRounded, Source, People, DynamicForm } from '@mui/icons-material';
import { Fragment, useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { LOGIN } from '../graphql/user-mutations.js';
import { useMutation } from '@apollo/client';
import { globalState } from '../State/UserState';
import { useReactiveVar } from "@apollo/client";
import AppBarMenus from './AppBarMenus';
import logo from '../Images/logo.svg';


function NavigationControl(props) {
  const user = useReactiveVar(globalState);
  const theme = useTheme();
  const drawerWidth = 240;
  const [open, setOpen] = useState(true);
  const [login] = useMutation(LOGIN);
  const history = useHistory();
  const [currentURL, setcurrentURL] = useState(history.location.pathname);

  const exploreTabLists = [
    ['Highlights', <AutoAwesome sx={{ fontSize: 14 }} />, '/highlights'],
    ['Top Platforms', <QuizOutlined sx={{ fontSize: 16 }} />, '/platform'],
    ['Top quizzes', <TrendingUp sx={{ fontSize: 16 }} />, '/quiz'],
    ['History', <History sx={{ fontSize: 17 }} />, '/user/:userId/history'],
  ];
  //GroupAddRounded,  Source, People, Drafts 
  const createTabLists = [
    ['Create quiz', <PostAddOutlined sx={{ fontSize: 17 }} />, '/quiz/create'],
    ['Creat platform', <GroupAddRounded sx={{ fontSize: 17 }} />, '/platform/create'],
    ['Drafts', <Source sx={{ fontSize: 16 }} />, '/user/:userId/drafts'],
    ['My platforms', <People sx={{ fontSize: 15 }} />, '/user/:userId/platforms'],
    ['My quizzes', <DynamicForm sx={{ fontSize: 15 }} />, '/user/:userId/quizzes'],
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
    console.log(`Logged in as`);
    console.log(data);
    console.log(response.getAuthResponse());
    console.log(`global after logging in`);
    console.log(globalState());
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
      padding: theme.spacing(3),
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

  const title = (title) => <Typography sx={{ fontWeight: '700', fontSize: 14, color: theme.palette.primary.main, my: 2, marginLeft: '22px' }}>{title}</Typography>;

  const tabTile = (tabName, icon, url, index) => {
    var isActive = checkUrl(url);
    return (<ListItem key={index} button selected={isActive} onClick={() => handleNextRoute(url)}
      sx={{ display: 'flex', alignItems: 'center', paddingLeft: '22px', py: '3px', }}>
      <ListItemIcon sx={{ minWidth: 30 }}>
        {icon}
      </ListItemIcon >
      <ListItemText
        disableTypography={true} primary={tabName}>
      </ListItemText>
    </ListItem >);
  };

  return (
    <Fragment>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: theme.palette.common.white, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)' }}>
        <Toolbar style={{ padding: 0 }}>
          <Grid container justifyContent='space-between'>
            <Grid container item xs={4}>
              <IconButton onClick={toggleDrawer} sx={{ mx: '14px', }}>
                <Menu sx={{ fill: theme.palette.grey['500'] }} />
              </IconButton>
              <img src={logo} style={{ height: 40, marginTop: 'auto' }} alt={"logo"} />
            </Grid>
            <Grid container item xs={4} ></Grid>
            <Grid container item xs={4} justifyContent='flex-end'>
              <div>
                {user.loggedin ?
                  <AppBarMenus avatarSrc={user.avatar} />
                  : <GoogleLogin
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    isSignedIn={true}
                    render={renderProps => (
                      <Button onClick={renderProps.onClick} sx={{
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
                    onFailure={() => { }}
                    cookiePolicy={'single_host_origin'} />}
              </div>
            </Grid>
          </Grid>
        </Toolbar>

      </AppBar>

      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', boxShadow: '2px 0px 6px rgba(0, 0, 0, 0.14)', border: 'none' },
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
            {title('EXPLORE')}
            {exploreTabLists.map(
              (data, index) => tabTile(...data, index)
            )}
            {title('CREATE')}
            {createTabLists.map(
              (data, index) => tabTile(...data, index)
            )}
            {title('FAVORITES')}
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
