import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, Typography, Box, Avatar, Grid, Divider, Button } from '@mui/material';
import { Settings, Edit, } from '@mui/icons-material';
import ProfilePrivacy from './ProfilePrivacy';
import { useHistory, useRouteMatch, Switch, Route, Link } from 'react-router-dom';

export default function ProfileScreen() {
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const routes = ['/overview', '/achievements', '/quizzes', '/platforms', '/history', '/friends'];
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // history.push(url + routes[newValue]);

  };

  useEffect(() => {
    console.log('remounted');
  }, []);

  return (
    <Grid container justifyContent='center' alignItems='center' >
      <Grid flexDirection='column' sx={{ maxWidth: '1000px' }} >
        <Grid sx={{ height: "150px", overflow: "hidden", }}>
          <img alt='cover' src="https://picsum.photos/1000" sx={{ objectFit: 'fill' }} />
        </Grid>
        <Grid item container justifyContent='center' flexDirection='column' alignItems='center' >
          <Avatar alt="avatar" src="https://i.pravatar.cc/300"
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
            User Name
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 14,
              mt: 1
            }} >
            This is my bio
          </Typography>
          <Divider flexItem sx={{ mt: 3 }} />
        </Grid>
        <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs
            value={value}
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
            <Tab label="Settings" {...a11yProps(6)} />

          </Tabs>
          <Grid item>
            <Button variant="text" startIcon={<Settings />} sx={{ mr: 1 }}>
              Settings
            </Button>
            <Button variant="contained" startIcon={<Edit />}>
              Edit Profile
            </Button>
          </Grid>
        </Grid>

        <TabPanel value={value} index={0}>
          Overview
        </TabPanel>
        <TabPanel value={value} index={1}>
          Achievements
        </TabPanel>
        <TabPanel value={value} index={2}>
          My Quizzes
        </TabPanel>
        <TabPanel value={value} index={3}>
          My Platforms
        </TabPanel>
        <TabPanel value={value} index={4}>
          History
        </TabPanel>
        <TabPanel value={value} index={5}>
          Friends
        </TabPanel>
        <TabPanel value={value} index={6}>
          <ProfilePrivacy/>
        </TabPanel>
        {/* <Link to={`${url}/quizzes`}>Props v. State</Link>
        <Grid>
          <Switch>
            <Route exact path={path}>
              <Overview />
            </Route>
            <Route path={`${path}/overview`}>
              <Overview />
            </Route>
            <Route exact path={`${path}/achievements`}>
              <Achievements />
            </Route>
            <Route exact path={`${path}/quizzes`}>
              <h3> my quizzes</h3>
            </Route>
            <Route exact path={`${path}/platforms`}>
              <h3> my platforms</h3>
            </Route>
            <Route exact path={`${path}/history`}>
              <h3> my history</h3>
            </Route>
            <Route exact path={`${path}/friends`}>
              <h3> my achievements</h3>
            </Route>
          </Switch>
        </Grid> */}

      </Grid>
    </Grid >
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `user-tab-${index}`,
    'aria-controls': `user-tabpanel-${index}`,
  };
}

// function Overview() {
//   return (
//     <h3> Overview</h3>
//   )
// }


// function Achievements() {
//   return (
//     <h3> Achievements</h3>
//   )
// }
