import { Grid } from "@mui/material";
import { CommonTitle, AchievementCard } from '..';
export default function Achievements() {
    return (
        <Grid container direction='column' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', py: 2, pl: 3 }}>
            <CommonTitle title='ACHIEVEMENTS' />
            <Grid container justifyContent='flex-start' mb={1}>
                {achievements.map((data) => <AchievementCard key={data._id}{...data} />)}
            </Grid>
        </Grid >
    );
}

const achievements = [
    {
        _id: 1,
        image: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'Some Achievements',
        description: 'There is a space for everybody. This is an offipage of this company',
        createdAt: Date.now()
    },
    {
        _id: 2,
        image: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'Some Achievements',
        description: 'There is a space for everybody. This is an offic gsdgfdsfgsdfgdsgfpage of this company',
        createdAt: Date.now()
    },
    {
        _id: 3,
        image: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'Some Achievements',
        description: 'There is a space for everybody. This is an officifas gsdgfds fgsdfgdsgfpage of this company',
        createdAt: Date.now()
    },
    {
        _id: 4,
        image: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'Some Achievements',
        description: 'There is a space for everybody. This is an offic gsdgfdsfgsdf gdsgfpage of this company',
        createdAt: Date.now()
    }
];