import { useQuery } from '@apollo/client';
import { Grid, Button, Typography } from '@mui/material';
import { QuizCard, PlatformCard, CommonTitle, FriendCard } from "../components";
import { useHistory, useLocation } from 'react-router';
import { SEARCH } from '../controllers/graphql/feed-queries';


export default function SearchResultsScreen() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    let [query, filter, page] = [searchParams.get('query'), searchParams.get('filter'), searchParams.get('page')];
    page = page || 1;

    const history = useHistory();
    const filters = ['all', 'platforms', 'quizzes', 'people'/*, 'tags'*/];
    if (!query && search) history.replace('/search');
    else if (!filters.includes(filter)) history.replace(`/search?query=${query}&filter=all&page=1`);
    query = decodeURIComponent(query);
    let platforms = [];
    let quizzes = [];
    let users = [];
    const { data, refetch } = useQuery(SEARCH, { variables: { searchString: query, filter: filter, skip: page - 1 } });

    if (data) {
        platforms = data.search.platforms;
        quizzes = data.search.quizzes;
        users = data.search.users;
    }

    return (
        !query && !filter ? null :
            <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center', py: 2, pl: 10 }}>
                <Grid container justifyContent='flex-start'>
                    {filters.map(filterBy => {
                        return (<Button
                            variant='contained'
                            disabled={filterBy === filter}
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
                                history.push(`/search?query=${query}&filter=${filterBy}&page=${page}`)
                            }}
                        > {filterBy[0].toUpperCase() + filterBy.slice(1)} </Button>);
                    }
                    )}
                </Grid>
                {filter === 'all' || filter === 'platforms' ?
                    <>
                        <CommonTitle title='PLATFORMS' />
                        <Grid container justifyContent='flex-start'>
                            {platforms.length ?
                                platforms.map(data => <Grid key={data._id} item ><PlatformCard {...data} /> </Grid>)
                                : <Typography> {`There are no relevant platforms matching "${query}"`} </Typography>
                            }
                        </Grid>
                    </>
                    : <></>
                }

                {filter === 'all' || filter === 'quizzes' ?
                    <>
                        <CommonTitle title='QUIZZES' />
                        <Grid container justifyContent='flex-start'>
                            {quizzes.length ?

                                quizzes.map((data) => <Grid key={data._id} item ><QuizCard {...data} refetch={refetch} /> </Grid>)
                                : <Typography> {`There are no relevant quizzes matching "${query}"`} </Typography>

                            }
                        </Grid>
                    </>
                    : null
                }

                {filter === 'all' || filter === 'people' ?
                    <>
                        <CommonTitle title='PEOPLE' />
                        <Grid container justifyContent='flex-start'>
                            {users.length ?
                                users.map((data) => <Grid key={data._id} item ><FriendCard {...data} /> </Grid>)
                                : <Typography> {`There are no users with usernames matching "${query}"`} </Typography>
                            }
                        </Grid>
                    </>
                    : null
                }
            </Grid >
    );
}

