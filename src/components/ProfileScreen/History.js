
import { Grid } from '@mui/material';
import { CommonTitle, HistoryCard } from '..';

export default function History({ userId }) {

    return (
        <Grid container direction='column' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', py: 2, pl: 3 }}>
            {/* history section */}
            <CommonTitle title='HISTORY' />
            <Grid container justifyContent='flex-start' mb={1}>

                {history.map((data) => <HistoryCard key={data._id}{...data} />)}

            </Grid>
        </Grid >
    );
}



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

