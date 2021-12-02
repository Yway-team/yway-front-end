import { useQuery, useReactiveVar } from '@apollo/client';
import { Grid, Button, Typography } from '@mui/material';
import { QuizCard, PlatformCard, CommonTitle, FriendCard } from "../components";
import { useHistory, useParams } from 'react-router';
import { filterState } from '../state/UserState';
import { SEARCH } from '../controllers/graphql/feed-queries';


export default function SearchResultsScreen() {
    const { query } = useParams();
    const filter = useReactiveVar(filterState);
    const history = useHistory();
    const filterLists = [
        ['all', 'All'],
        ['platforms', 'Platforms'],
        ['quizzes', 'Quizzes'],
        ['people', 'People'],
        // ['tags', 'Tags'],
    ];
    let platforms = [];
    let quizzes = [];
    let users = [];
    const { data } = useQuery(SEARCH, { variables: { searchString: query, filter: filter } });

    if (data) {
        platforms = data.search.platforms;
        quizzes = data.search.quizzes;
        users = data.search.users;

    }

    return (
        <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center', py: 2, pl: 10 }}>
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
            {filter === 'all' || filter === 'platforms' ?
                <>
                    <CommonTitle title='PLATFORMS' />
                    <Grid container justifyContent='flex-start'>
                        {platforms.length != 0 ?
                            platforms.map((data) => <Grid key={data._id} item ><PlatformCard {...data} /> </Grid>)
                            : <Typography> {`There is no related platforms for " ${query} "`} </Typography>
                        }
                    </Grid>
                </>
                : <></>
            }

            {filter === 'all' || filter === 'quizzes' ?
                <>
                    <CommonTitle title='QUIZZES' />
                    <Grid container justifyContent='flex-start'>
                        {quizzes.length != 0 ?

                            quizzes.map((data) => <Grid key={data._id} item ><QuizCard {...data} /> </Grid>)
                            : <Typography> {`There is no related quizzes for " ${query} "`} </Typography>

                        }
                    </Grid>
                </>
                : <></>
            }

            {filter === 'all' || filter === 'people' ?
                <>
                    <CommonTitle title='PEOPLE' />
                    <Grid container justifyContent='flex-start'>
                        {users.length != 0 ?
                            users.map((data) => <Grid key={data._id} item ><FriendCard {...data} /> </Grid>)
                            : <Typography> {`There is no user with username " ${query} "`} </Typography>

                        }
                    </Grid>
                </>
                : <></>
            }
        </Grid >
    );
}

