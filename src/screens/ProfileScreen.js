import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ProfileScreen() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ position: "relative" }}>
        <Box sx={{ height: "300px", overflow: "hidden" }}>
          <img src="https://picsum.photos/1000" />
        </Box>
        <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" sx={{ position: "absolute", width: "200px", height: "200px", top: "50%", left: "400px" }} />
      </Box>
      <Typography variant='h5' sx={{ position: "absolute", top: 550, left: 810 }}> happysnake594</Typography>
      <Typography variant='h6' sx={{ position: "absolute", top: 580, left: 830 }}> This is my bio.</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingTop: "125px" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Achievements" {...a11yProps(1)} />
          <Tab label="My Quizzes" {...a11yProps(2)} />
          <Tab label="My Platforms" {...a11yProps(3)} />
          <Tab label="History" {...a11yProps(4)} />
          <Tab label="Friends" {...a11yProps(5)} />
          <Button variant="text" startIcon={<SettingsIcon />}>
            Settings
          </Button>
          <Button variant="contained" startIcon={<EditIcon />}>
            Edit Profile
          </Button>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} >
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
    </Box >
  );
}
