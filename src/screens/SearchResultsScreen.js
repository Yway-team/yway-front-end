import { useQuery } from '@apollo/client';
import { Grid, Chip, Button } from '@mui/material';
import { QuizCard, PlatformCard, CommonTitle, FriendCard } from "../components";
import { useHistory, useParams } from 'react-router';
import { filterState } from '../state/UserState';


export default function SearchResultsScreen() {
    const { query, filter } = useParams();
    const history = useHistory();
    const filterLists = [
        ['all', 'All'],
        ['platforms', 'Platforms'],
        ['quizzes', 'Quizzes'],
        ['people', 'People'],
        ['tags', 'Tags'],
    ];
    return (
        <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center', py: 2, pl: 10 }}>
            <CommonTitle title='RESULTS' />
            <Grid container justifyContent='flex-start'>
                {filterLists.map((currFilter, index) => {
                    return (<Button
                        variant='contained'
                        disabled={currFilter[0] === filter}
                        sx={{
                            marginRight: 2,
                            backgroundColor: 'grey.200',
                            color: 'grey.500',
                            '&.Mui-disabled': {
                                backgroundColor: 'primary.main',
                                color: 'white'
                            }
                        }}
                        onClick={() => {
                            filterState(currFilter[0])
                            history.push(`/search/${query}/${filterState()}`)
                        }}
                    > {currFilter[1]} </Button>);
                }
                )}
            </Grid>
            <CommonTitle title='PLATFORMS' />
            <Grid container justifyContent='flex-start'>
                {query}
            </Grid>
            <CommonTitle title='QUIZZES' />
            <Grid container justifyContent='flex-start'>
                {filter}
            </Grid>
        </Grid >
    );
}

