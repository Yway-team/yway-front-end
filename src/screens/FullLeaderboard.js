import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Header from '../components/PlatformScreen/Header';
import { useParams, useHistory } from 'react-router';
import usePrivilegedQuery from '../hooks/usePrivilegedQuery';
import { GET_PLATFORM_SUMMARY } from '../controllers/graphql/platform-queries';

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

export default function FullLeaderboard() {
  const [value, setValue] = React.useState(0);

  const {platformName} = useParams()
  const history = useHistory()
  console.log(history)

  const { data: platformData, refetch, error, loading } = usePrivilegedQuery(GET_PLATFORM_SUMMARY, { variables: { title: platformName } });

  let platformSummary;
  if (platformData) {
      console.log(platformData)
      platformSummary = platformData.getPlatformSummary;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const returnToPlatform = () => {
    history.push(`/platform/${platformName}`)
  }

  return (
    <>
    <Header platformName={platformName}/>
    <Box sx={{ width: "100%", mt: "100px", minHeight: "600px"}}>
      <Box sx={{paddingLeft: "5%"}}>
        <Typography sx={{fontSize:"20px", fontWeight: "bold"}}>
          Return to Platform
        </Typography>
        <Typography sx={{fontSize:"20px", fontWeight: "bold"}}>
          Leaderboard
        </Typography>
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
    </>
  );
}
