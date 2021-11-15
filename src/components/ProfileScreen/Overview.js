import { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { CommonTitle, AchievementCard, ShowMoreButton, HistoryCard, FriendCard } from '..';
import { TungstenRounded, Bolt } from '@mui/icons-material';
export default function Overview() {
    //Overview tab display this component in Profile Screen
    const [expandAchievements, setExpandAchievements] = useState(false);
    function toggleExpandAchievements() {
        setExpandAchievements(!expandAchievements);
    }

    const [expandHistory, setExpandHistory] = useState(false);
    function toggleExpandHistory() {
        setExpandHistory(!expandHistory);
    }

    const [expandFriends, setExpandFriends] = useState(false);
    function toggleExpandFriends() {
        setExpandFriends(!expandFriends);
    }
    return (
        <Grid container direction='column' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', py: 7 }}>
            <Grid container direction='row' justifyContent='space-evenly' sx={{ width: '100%', px: 20 }}>
                <Grid xs={4} item container direction='column' justifyContent='center' alignItems='center' spacing={1}
                    sx={{ height: 100, backgroundColor: 'primary.light', borderRadius: '12px 12px 12px 12px' }}>
                    <Grid container item justifyContent='center'>
                        <Typography sx={{
                            fontWeight: '700',
                            fontSize: 16,
                            color: 'common.black',
                            textAlign: 'center',
                            width: '100%',
                        }
                        }> Creator Points</Typography >
                    </Grid>
                    <Grid container item alignItems='center' justifyContent='center'>
                        <Typography sx={{
                            fontWeight: '700',
                            fontSize: 24,
                            color: 'primary.main'
                        }}>1243</Typography>
                        <TungstenRounded sx={{ fill: '#ff5a1d', fontSize: 24, ml: 1 }} /></Grid>
                </Grid>
                <Grid xs={4} item container direction='column' justifyContent='center' alignItems='center' spacing={1}
                    sx={{ height: 100, backgroundColor: 'primary.light', borderRadius: '12px 12px 12px 12px' }}>
                    <Grid container item justifyContent='center'>
                        <Typography sx={{
                            fontWeight: '700',
                            fontSize: 16,
                            color: 'common.black',
                            textAlign: 'center',
                            width: '100%',
                        }
                        }> Play Points</Typography >
                    </Grid>
                    <Grid container item alignItems='center' justifyContent='center'>
                        <Typography sx={{
                            fontWeight: '700',
                            fontSize: 24,
                            color: 'primary.main'
                        }}>1243</Typography>
                        <Bolt sx={{ fill: '#ff5a1d', fontSize: 24, ml: 1 }} /></Grid>
                </Grid>
            </Grid >

            {/* //Achievements section  */}
            <CommonTitle title='ACHIEVEMENTS' />
            <Grid container justifyContent='flex-start'>
                {expandAchievements ?
                    achievements.map((data) => <AchievementCard key={data._id}{...data} />) :
                    achievements.slice(0, 2).map((data) => <AchievementCard key={data._id}{...data} />)}
            </Grid>
            {achievements.length > 2 ?
                <ShowMoreButton expand={expandAchievements} onClick={toggleExpandAchievements} /> : null}

            {/* history section */}
            <CommonTitle title='HISTORY' />
            <Grid container justifyContent='flex-start' mb={1}>
                {expandHistory ?
                    history.map((data) => <HistoryCard key={data._id}{...data} />) :
                    history.slice(0, 2).map((data) => <HistoryCard key={data._id}{...data} />)}
            </Grid>
            {history.length > 2 ?
                <ShowMoreButton expand={expandHistory} onClick={toggleExpandHistory} /> : null}

            <CommonTitle title='FRIENDS' />
            <Grid container justifyContent='flex-start' mb={1}>
                {expandFriends ?
                    friends.map((data) => <FriendCard key={data._id}{...data} />) :
                    friends.slice(0, 4).map((data) => <FriendCard key={data._id}{...data} />)}
            </Grid>
            {friends.length > 4 ?
                <ShowMoreButton expand={expandFriends} onClick={toggleExpandFriends} /> : null}


        </Grid >
    );
}


const achievements = [
    {
        _id: 1,
        image: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'Some Achievements',
        description: 'There is a space for everybody. This is an offipage of this company',
        timestamp: Date.now()
    },
    {
        _id: 2,
        image: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'Some Achievements',
        description: 'There is a space for everybody. This is an offic gsdgfdsfgsdfgdsgfpage of this company',
        timestamp: Date.now()
    },
    {
        _id: 3,
        image: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'Some Achievements',
        description: 'There is a space for everybody. This is an officifas gsdgfds fgsdfgdsgfpage of this company',
        timestamp: Date.now()
    },
    {
        _id: 4,
        image: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'Some Achievements',
        description: 'There is a space for everybody. This is an offic gsdgfdsfgsdf gdsgfpage of this company',
        timestamp: Date.now()
    }
];

const history = [
    {
        _id: 1,
        image: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        first: 'Attemped the quiz of this long and difficult ',
        link: 'some link',
        second: ' and scored this much. ',
        type: 'quiz',
        timestamp: Date.now()
    },
    {
        _id: 2,
        image: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        first: 'Attemped the quiz of this long and difficult ',
        link: 'some link',
        second: ' and scored this much. ',
        type: 'quiz',
        timestamp: Date.now()
    },
    {
        _id: 3,
        image: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        first: 'Attemped the quiz of this long and difficult ',
        link: 'some link',
        second: ' and scored this much. ',
        type: 'quiz',
        timestamp: Date.now()
    },
    {
        _id: 4,
        image: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        first: 'Attemped the quiz of this long and difficult ',
        link: 'some link',
        second: ' and scored this much. ',
        type: 'quiz',
        timestamp: Date.now()
    }
];

const friends = [
    {
        _id: 1,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    },
    {
        _id: 2,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    },
    {
        _id: 3,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    },
    {
        _id: 4,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    },
    {
        _id: 5,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    },
    {
        _id: 6,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    },
    {
        _id: 7,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    },
    {
        _id: 8,
        avatar: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'SoekindoGName123',
    }
]