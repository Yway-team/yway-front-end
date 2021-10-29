import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Grid,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Menu } from '@mui/icons-material';
import { Fragment, useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { LOGIN } from '../Queries/mutations.js';
import { useMutation } from '@apollo/client';
import { globalState } from '../State/UserState';
import { useReactiveVar } from "@apollo/client";
import ProfileAvatar from './ProfileAvatar';
import logo from '../Images/logo.svg';


function NavigationControl() {
  const user = useReactiveVar(globalState);
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [login] = useMutation(LOGIN);
  const history = useHistory();
  const [currentURL, setcurrentURL] = useState(history.location.pathname);
  const toggleDrawer = () => {
    setOpen(!open);
  }

  const handleLogin = async (response) => {
    const idToken = response.getAuthResponse().id_token;
    const { data } = (await login({ variables: { idToken: idToken } }));
    console.log(data);
    if (data) {
      globalState({
        loggedin: true,
        googleId: data.login.googleId.toString(),
        numbers: data.login.numbers,
        _id: data.login._id.toString()
      });
    }
    console.log(`Logged in as`);
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

  return (
    <Fragment>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: theme.palette.common.white, boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.05)' }}>
        <Toolbar >
          <Grid container justifyContent='space-between'>
            <Grid container item xs={4}>
              <IconButton onClick={toggleDrawer}>
                <Menu sx={{ fill: theme.palette.grey['600'] }} />
              </IconButton>
              <img src={logo} style={{ height: 40, marginLeft: 10 }} alt={"logo"} />
            </Grid>
            <Grid container item xs={4} ></Grid>
            <Grid container item xs={4} justifyContent='flex-end'>
              <div>
                {user.loggedin ?
                  <ProfileAvatar />
                  : <GoogleLogin
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    isSignedIn={true}
                    render={renderProps => (
                      <Button onClick={renderProps.onClick} sx={{
                        background: theme.palette.primary.main,
                        paddingRight: 3,
                        paddingLeft: 3,
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
          width: 240,
          flexShrink: 0,

          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', boxShadow: '2px 0px 6px rgba(0, 0, 0, 0.14)', border: 'none' },
        }}>
        <Box sx={{ overflow: 'auto', marginTop: 8 }}>
          <List>
            {[['Explore', '/'], ['Create', '/create'], ['Favorites', '/favorites']].map((text, index) => (
              <ListItem button key={text[0]} onClick={() => history.push(text[1])}>
                <ListItemText disableTypography primary={<Typography variant={'h6'} color={text[1] === currentURL ? 'primary' : 'grey'}> {text[0]}</Typography>} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Fragment >
  );
}

export default NavigationControl;
