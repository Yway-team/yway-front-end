import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Grid, Stack } from '@mui/material';
import { useHistory } from 'react-router';
import MiniLeaderboardRow from './MiniLeaderboardRow';

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

export default function MiniLeaderboard({ width, platformName, leaderboardEntries, color }) {
  /*
  leaderboardEntries {
    userId: ID
    avatar: String
    score: Number (number of attempts of one of the user's quizzes on this platform)
    secondaryScore: Number (number of quizzes owned by the user on this platform)
    username: String
  }
  */

  const history = useHistory();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sortingFunction = (a, b) => {
    return b.secondaryScore - a.secondaryScore
  }
  if (leaderboardEntries) {
    leaderboardEntries = leaderboardEntries.slice().sort(sortingFunction)
  }

  return (
    <Box sx={{ width: width }}>
      <Stack justifyContent='space-between' direction='row' alignItems='center' mb={3}>
        <Typography sx={{ fontSize: "20px", fontWeight: "bold", color: 'common.black' }}>
          Leaderboard
        </Typography>
        <Button
          onClick={() => history.push(`/leaderboard/${platformName}`)}
          sx={{
            color: color,
            px: 1,
            py: 0,
            mr: 4,
            "&:hover": {
              backgroundColor: color + '20',
              color: color
            }
          }}>
          View Full
        </Button>
      </Stack>
      <Typography>
        <Grid container sx={{ width }} spacing={2}>
          <Grid item container xs={12} spacing={0} sx={{ borderBottom: "2px solid lightgray", borderColor: color, fontSize: 14, fontWeight: 600, pb: 1, mb: 1 }}>
            <Grid item xs={1}>#</Grid>
            <Grid item xs={7}>User</Grid>
            <Grid item xs={2} sx={{ position: "relative", left: "10px" }}>Score</Grid>
          </Grid>
          {leaderboardEntries ? leaderboardEntries.map((leaderBoardEntry, i) => { if (i < 10) { return <MiniLeaderboardRow key={i} avatar={leaderBoardEntry.avatar} score={leaderBoardEntry.secondaryScore} username={leaderBoardEntry.username} position={i} /> } }) : <Grid item xs={12}>Nobody has played any quizzes yet!</Grid>}
        </Grid>
      </Typography>
    </Box >
  );
}
