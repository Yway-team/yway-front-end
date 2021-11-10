import { useState, useEffect } from 'react';
import { Tab, Tabs, Typography, Box, Avatar, Grid, Divider, Button, Dialog } from '@mui/material';
import { Settings, Edit, } from '@mui/icons-material';
import ProfilePrivacy from './ProfilePrivacy';
import {
  useHistory,
  useParams,
  Switch,
  Route
} from 'react-router-dom';
import {
  Overview
} from '../components';
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
  const [settingsOpen, setSettingsOpen] = useState(false);


  const handleClickSettingsOpen = () => {
    setSettingsOpen(true);
  };
  const handleSettingsClose = () => {
    setSettingsOpen(false);
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
      <Grid container justifyContent='center' alignItems='center' >
        <Grid flexDirection='column' sx={{ maxWidth: '1000px' }} >
          <Grid sx={{ height: "150px", overflow: "hidden", }}>
            <img alt='cover' src="https://picsum.photos/1000" sx={{ objectFit: 'fill' }} />
          </Grid>
          <Grid item container justifyContent='center' flexDirection='column' alignItems='center' >
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
              }} >
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
              <Tab label="My Quizzes"{...a11yProps(2)} />
              <Tab label="My Platforms" {...a11yProps(3)} />
              <Tab label="History"{...a11yProps(4)} />
              <Tab label="Friends" {...a11yProps(5)} />

            </Tabs>
            <Grid item>
              <Button variant="text" startIcon={<Settings />} sx={{ mr: 1 }} onClick={handleClickSettingsOpen}>
                Settings
              </Button>
              <Button variant="contained" startIcon={<Edit />}>
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
                Achievements
              </Route>
              <Route exact path={`/user/:userId/quizzes`}>
                my quizzes
              </Route>
              <Route exact path={`/user/:userId/platforms`}>
                my platforms
              </Route>
              <Route exact path={`/user/:userId/history`}>
                my history
              </Route>
              <Route exact path={`/user/:userId/friends`}>
                my achievements
              </Route>
            </Switch>
          </Box>

        </Grid>
      </Grid >



      <Dialog open={settingsOpen} onClose={handleSettingsClose}
        aria-labelledby="privacy-settings-dialog"  >
        <ProfilePrivacy userInfo={userInfo} handleClose={handleSettingsClose} />
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

