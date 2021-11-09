import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import { QuizCard, PlatformCard, CommonTitle } from "../components";
import { GET_QUIZ_HIGHLIGHTS } from '../controllers/graphql/quiz-queries';



export default function HighlightsScreen() {
    const { data: quizData } = useQuery(GET_QUIZ_HIGHLIGHTS, { variables: { howMany: 10 } });
    let quizzes = null;
    if (quizData) {
        quizzes = quizData.getQuizHighlights;
    }
    return (
        <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center', p: 2, pl: 10, }}>
            <CommonTitle title='NEW PLATFORMS' />
            {/* <Typography variant='h5'>TOP QUIZZES</Typography> */}
            <Grid container justifyContent='flex-start'>
                {platforms.map((data) => <Grid key={data._id} xs={6} sm={6} item ><PlatformCard {...data} /> </Grid>)}
            </Grid>
            <CommonTitle title='TOP QUIZZES' />
            {/* <Typography variant='h5'>TOP QUIZZES</Typography> */}
            <Grid container justifyContent='flex-start'>
                {quizzes ? quizzes.map((data) => <QuizCard key={data._id} {...data} />) : null}
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

/*
const quizzes = [
    {
        _id: 1,
        name: 'How much do you know your chinese cuisine',
        description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorpe eget nulla facilisi etia dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis",
        thumbnail: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        numQuestions: 10,
        creator: 'yourMama101',
        creatorImage: "https://i.pravatar.cc/300",
        rating: 4.5,
        timestamp: '2 months ago',
        platformImage: "https://i.pravatar.cc/300",
        platform: 'Mcdonal123',
    },
    {
        _id: 2,
        name: 'How much do you know your chinese cuisine',
        description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorpe eget nulla facilisi etia dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis",
        thumbnail: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        numQuestions: 10,
        creator: 'yourMama101',
        creatorImage: "https://i.pravatar.cc/300",
        rating: 4.5,
        timestamp: '2 months ago',
        platformImage: "https://i.pravatar.cc/300",
        platform: 'Mcdonal123',
    },
    {
        _id: 3,
        name: 'How much do you know your chinese cuisine',
        description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorpe eget nulla facilisi etia dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis",
        thumbnail: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        numQuestions: 10,
        creator: 'yourMama101',
        creatorImage: "https://i.pravatar.cc/300",
        rating: 4.5,
        timestamp: '2 months ago',
        platformImage: "https://i.pravatar.cc/300",
        platform: 'Mcdonal123',
    },
    {
        _id: 4,
        name: 'How much do you know your chinese cuisine',
        description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorpe eget nulla facilisi etia dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis",
        thumbnail: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        numQuestions: 10,
        creator: 'yourMama101',
        creatorImage: "https://i.pravatar.cc/300",
        rating: 4.5,
        timestamp: '2 months ago',
        platformImage: "https://i.pravatar.cc/300",
        platform: 'Mcdonal123',
    },
    {
        _id: 5,
        name: 'How much do you know your chinese cuisine',
        description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorpe eget nulla facilisi etia dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis",
        thumbnail: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        numQuestions: 10,
        creator: 'yourMama101',
        creatorImage: "https://i.pravatar.cc/300",
        rating: 4.5,
        timestamp: '2 months ago',
        platformImage: "https://i.pravatar.cc/300",
        platform: 'Mcdonal123',
    },
    {
        _id: 6,
        name: 'How much do you know your chinese cuisine',
        description: "Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorpe eget nulla facilisi etia dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra  tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis",
        thumbnail: "https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg",
        numQuestions: 10,
        creator: 'yourMama101',
        creatorImage: "https://i.pravatar.cc/300",
        rating: 4.5,
        timestamp: '2 months ago',
        platformImage: "https://i.pravatar.cc/300",
        platform: 'Mcdonal123',
    },
];*/
