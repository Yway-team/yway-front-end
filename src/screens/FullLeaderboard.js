import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Header from '../components/PlatformScreen/Header';
import { useParams, useHistory } from 'react-router';
import usePrivilegedQuery from '../hooks/usePrivilegedQuery';
import { GET_PLATFORM_SUMMARY } from '../controllers/graphql/platform-queries';
import FullLeaderboardRow from '../components/PlatformScreen/FullLeaderboardRow';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

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
  let authorized;
  let leaderboardEntries;
  if (platformData) {
      console.log(platformData)
      platformSummary = platformData.getPlatformSummary;
      authorized = platformData.getPlatformSummary.moderator
      leaderboardEntries = platformSummary.leaderboardEntries
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const returnToPlatform = () => {
    history.push(`/platform/${platformName}`)
  }

  const sortingFunction = (a,b) => {
    return b.secondaryScore-a.secondaryScore
  }
  if (leaderboardEntries){
    leaderboardEntries = leaderboardEntries.slice().sort(sortingFunction)
  }

  return (
    <>
    {platformSummary ? <Header platformName={platformName}
                thumbnailImg={platformSummary.thumbnailImg}
                bannerImg={platformSummary.bannerImg}
                favorites={platformSummary.favorites}
                numQuestions={platformSummary.numQuestions}
                numQuizzes={platformSummary.numQuizzes}
                description={platformSummary.description}
                tags={platformSummary.tags}
                color={platformSummary.color}
                id={platformSummary._id}
                authorized={authorized}
            /> : null}
    {platformSummary&&
      <Box sx={{ width: "80%", mt: "10px", ml: "50px", minHeight: "600px"}}>
        <Button
          onClick={returnToPlatform}
          sx={{
            color: platformSummary.color,
            py: 1,
            "&:hover": {
              backgroundColor: platformSummary.color + '20',
              color: platformSummary.color
            },
            fontSize: "20px",
            ml:"-40px"
          }}>
            <KeyboardArrowLeftIcon/>
          Return to Platform
        </Button>
        <Typography sx={{fontSize:"20px", fontWeight: "bold"}}>
          Featured Creators
        </Typography>
        <Typography>
          <Grid container justifyContent="center" spacing={2}>
          <Grid item container xs={12} spacing={0} sx={{borderBottom: `1px solid ${platformSummary.color}`,fontWeight: 600, pb: 1, mb: 1, mt:2}}>
            <Grid item xs={1}>#</Grid>
            <Grid item xs={7}>User</Grid>
            <Grid item xs={2} sx={{position:"relative", left:"10px"}}>Score</Grid>
          </Grid>
          {leaderboardEntries?leaderboardEntries.map((leaderBoardEntry,i)=>{if (i < 10) {return <FullLeaderboardRow key={i} avatar={leaderBoardEntry.avatar} score={leaderBoardEntry.secondaryScore} username={leaderBoardEntry.username} position={i}/>}}):<Grid item xs={12}>Nobody has played any quizzes yet!</Grid>}
        </Grid>
        </Typography>
      </Box>}
    </>
  );
}
