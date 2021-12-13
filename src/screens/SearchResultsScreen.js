import { useQuery } from '@apollo/client';
import { Grid, Button, Typography, Stack, CircularProgress } from '@mui/material';
import { QuizCard, PlatformCard, CommonTitle, FriendCard } from "../components";
import { useHistory, useLocation } from 'react-router';
import { SEARCH } from '../controllers/graphql/feed-queries';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';


export default function SearchResultsScreen() {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    let [query, filter, page] = [searchParams.get('query'), searchParams.get('filter'), searchParams.get('page')];
    page = page || 1;
    page = parseInt(page);

    const history = useHistory();
    const filters = ['all', 'platforms', 'quizzes', 'people'/*, 'tags'*/];
    if (!query && search) history.replace('/search');
    else if (!filters.includes(filter)) history.replace(`/search?query=${query}&filter=all&page=1`);
    query = decodeURIComponent(query);
    let platforms = [];
    let quizzes = [];
    let users = [];
    const { loading, data, refetch } = useQuery(SEARCH, { variables: { searchString: query, filter: filter, skip: 30 * (page - 1) } });  // 30 is the number of items returned per page - todo: handle in back-end
    let fetchCount = 30;

    if (data) {
        platforms = data.search.platforms;
        quizzes = data.search.quizzes;
        users = data.search.users;
    }

    if (loading) {
        return (
            <Grid container justifyContent='center' alignItems='center' sx={{ height: '40vh', width: '100%' }}>
                <CircularProgress variant='indeterminate' color='primary' />
            </Grid>
        );
    }

    function ShowPagination(workArr) {
        if (filter === 'all' || workArr.length === 0) return <></>;
        let disablePrev = page === 1;
        let disableNext = workArr.length < fetchCount;
        return (
            <Stack direction='row' justifyContent='flex-start' alignItems='center' sx={{ width: '100%', my: 1 }} >
                <Button disabled={disablePrev} sx={{ fontWeight: 600, mr: 40 }} startIcon={<ChevronLeft />}
                    onClick={() => {
                        history.push(`/search?query=${query}&filter=${filter}&page=${page - 1}`);
                    }}
                > Previous </Button>
                <Button disabled={disableNext} sx={{ fontWeight: 600 }} endIcon={<ChevronRight />}
                    onClick={() => {
                        history.push(`/search?query=${query}&filter=${filter}&page=${page + 1}`);
                    }}
                > Next </Button>
            </Stack>);
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
                        {ShowPagination(platforms)}
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
                        {ShowPagination(quizzes)}
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
                            {ShowPagination(users)}
                        </Grid>
                    </>
                    : null
                }
            </Grid >
    );
}

