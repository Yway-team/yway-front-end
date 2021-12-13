import { Grid, CircularProgress } from '@mui/material';
import { PlatformCard, CommonTitle } from "../components";
import { useQuery } from '@apollo/client';
import { GET_TOP_PLATFORMS } from '../controllers/graphql/platform-queries';



export default function TopPlatformsScreen() {
    const { data: platformData, loading } = useQuery(GET_TOP_PLATFORMS, { variables: { howMany: 20 } });
    let platforms = null;

    if (loading) {
        return (
            <Grid container justifyContent='center' alignItems='center' sx={{ height: '60vh', width: '100%' }}>
                <CircularProgress variant='indeterminate' color='primary' />
            </Grid>
        );
    }
    if (platformData) {
        platforms = platformData.getTopPlatforms;
    }
    return (
        <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center', p: 2, pl: 10, }}>
            <CommonTitle title='TOP PLATFORMS' />
            {/* <Typography variant='h5'>TOP QUIZZES</Typography> */}
            <Grid container justifyContent='flex-start'>
                {platforms ? platforms.map((data) => <Grid key={data._id} item ><PlatformCard {...data} /> </Grid>) : null}
            </Grid>
        </Grid>
    );
}


const platforms = [
    {
        _id: 1,
        profileImage: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'someCompany',
        favorites: '1M',
        numQuizzes: '235',
        description: 'There is a space for everybody. This is an officifasfasdfasgafdsssssssssssssssssssgdsagasgdal gsdgfdsfgsdfgdsgfpage of this company'
    },
    {
        _id: 2,
        profileImage: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'someCompany',
        favorites: '1M',
        numQuizzes: '235',
        description: 'There is a space for everybody. This is an official page of this company'
    },
    {
        _id: 3,
        profileImage: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'someCompany',
        favorites: '1M',
        numQuizzes: '235',
        description: 'There is a space for everybody. This is an official page of this company'
    },
    {
        _id: 4,
        profileImage: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'someCompany',
        favorites: '1M',
        numQuizzes: '235',
        description: 'There is a space for everybody. This is an official page of this company'
    },
    {
        _id: 5,
        profileImage: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'someCompany',
        favorites: '1M',
        numQuizzes: '235',
        description: 'There is a space for everybody. This is an official page of this company'
    },
    {
        _id: 6,
        profileImage: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        name: 'someCompany',
        favorites: '1M',
        numQuizzes: '235',
        description: 'There is a space for everybody. This is an official page of this company'
    },
];