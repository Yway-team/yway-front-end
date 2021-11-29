import { useQuery } from '@apollo/client';
import { Grid, Chip } from '@mui/material';
import { QuizCard, PlatformCard, CommonTitle, FriendCard } from "../components";
import { useHistory, useParams } from 'react-router';


export default function SearchResultsScreen() {
    const { query, filter } = useParams();
    const history = useHistory();
    return (
        <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center', py: 2, pl: 10 }}>
            <CommonTitle title='PLATFORMS' />
            <Grid container justifyContent='flex-start'>
                {query}
            </Grid>
            <CommonTitle title='QUIZZES' />
            <Grid container justifyContent='flex-start'>
                {filter}
            </Grid>
        </Grid>
    );
}