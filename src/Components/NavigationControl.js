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
  Grid
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Menu } from '@mui/icons-material';
import { Fragment, useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { LOGIN } from '../Queries/mutations.js';
import { useMutation } from '@apollo/client';
import { globalState } from '../State/UserState';
import { useReactiveVar } from "@apollo/client";


function NavigationControl() {
  const user = useReactiveVar(globalState);
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [login] = useMutation(LOGIN);
  const toggleDrawer = () => {
    setOpen(!open);
  }

  const handleLogin = async (response) => {
    const idToken = response.getAuthResponse().id_token;
    console.log('Attempting to log in...');
    const { data } = (await login({ variables: { idToken: idToken } }));
    if (data) {
      globalState({
        loggedin: true,
        googleId: data.login.googleId.toString(),
        number: Number(data.login.number),
        _id: data.login._id.toString()
      });
    }
    console.log(`Logged in as`);
    console.log(globalState());
  }

  const handleLogout = () => {
    globalState({
      loggedin: false,
      googleId: "",
      number: null,
      _id: ""
    });
    console.log(`Logged out`);

  }
  return (
    <Fragment>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: theme.palette.common.white, boxShadow: theme.shadows, }}>
        <Toolbar>
          <Grid container justifyContent='space-between'>
            <IconButton onClick={toggleDrawer}>
              <Menu sx={{ fill: theme.palette.primary.main }} />
            </IconButton>
            <Typography variant="h5" noWrap component="div" sx={{ color: 'primary.main', marginLeft: 5 }}>
              Yway
            </Typography>
            {user.loggedin ? <Button variant='outlined' onClick={handleLogout}> LOG OUT</Button>
              :
              <GoogleLogin
                clientId={process.env.REACT_APP_CLIENT_ID}
                render={renderProps => (
                  <Button onClick={renderProps.onClick} sx={
                    {
                      background: theme.palette.primary.main,
                      color: 'common.white',
                      paddingLeft: 5,
                      paddingRight: 5,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.main,
                      }

                    }
                  }>Sign in with Google</Button>
                )}
                buttonText="Sign in with Google"
                onSuccess={handleLogin}
                onFailure={() => { }}
                cookiePolicy={'single_host_origin'}
              />}
          </Grid>
        </Toolbar>

      </AppBar>
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}>
        <Box sx={{ overflow: 'auto', marginTop: 8 }}>
          <List>
            {[['Explore', '/'], ['Create', './create'], ['Favorites', './favorites']].map((text, index) => (
              <ListItem button key={text[0]}>
                <Link to={text[1]} > <ListItemText primary={text[0]} /></Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Fragment >
  );
}

export default NavigationControl;
