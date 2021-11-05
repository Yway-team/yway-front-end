import { Grid, Typography } from '@mui/material';

import { PlatformCard, CommonTitle } from "../components";



export default function TopPlatformsScreen() {
    return (
        <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center', p: 2, pl: 10, }}>
            <CommonTitle title='TOP PLatforms' />
            {/* <Typography variant='h5'>TOP QUIZZES</Typography> */}
            <Grid container justifyContent='flex-start'>
                {platforms.map((data) => <Grid key={data._id} xs={6} sm={6} item ><PlatformCard {...data} /> </Grid>)}
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