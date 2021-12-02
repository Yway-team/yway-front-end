import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';

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

export default function MiniLeaderboard({width,platformName}) {
  const history = useHistory()

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: width }}>
      <Box sx={{paddingLeft: "5%"}}>
        <Typography sx={{fontSize:"20px", fontWeight: "bold"}}>
          Leaderboards
        </Typography>
      </Box>
      <Box sx={{paddingLeft: "5%"}}>
        <Button onClick={()=>history.push(`/leaderboard/${platformName}`)}>
          <Typography sx={{fontSize:"15px", color: "blue"}}>
            View Full Leaderboard >>
          </Typography>
        </Button>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Top" sx={{fontSize:"12px", minWidth: `${20/2}px`}} {...a11yProps(0)} />
          <Tab label="Rising" sx={{fontSize:"12px", minWidth: `${20/2}px`}} {...a11yProps(1)} />
          <Tab label="Past Week" sx={{fontSize:"12px"}} {...a11yProps(2)} />
          <Tab label="Past Month" sx={{fontSize:"12px"}} {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Nobody has played any quizzes yet!
      </TabPanel>
      <TabPanel value={value} index={1}>
        Nobody has played any quizzes yet!
      </TabPanel>
      <TabPanel value={value} index={2}>
        Nobody has played any quizzes yet!
      </TabPanel>
      <TabPanel value={value} index={3}>
        Nobody has played any quizzes yet!
      </TabPanel>
      <TabPanel value={value} index={4}>
        Nobody has played any quizzes yet!
      </TabPanel>
    </Box>
  );
}
