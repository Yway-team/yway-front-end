import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

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

export default function ProfilePage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ paddingTop: "200px", paddingLeft: "400px", height: '100%', width: '100%'}}>
      <Box sx={{position: "relative"}}>
        <Box sx={{height: "300px", overflow: "hidden"}}>
          <img src="https://picsum.photos/1000"/>
        </Box>
        <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/300" sx={{position: "absolute", width:"200px", height: "200px", top:"50%", left:"400px"}}/>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingTop:"50px"}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Achievements" {...a11yProps(1)} />
          <Tab label="My Quizzes" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <h1>History</h1>
        <h1>Friends</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Put Achievements Here!
      </TabPanel>
      <TabPanel value={value} index={2}>
        Put My Quizzes Here!
      </TabPanel>
    </Box>
  );
}
