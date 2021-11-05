import { Grid, Typography } from '@mui/material';

import { QuizCard, CommonTitle } from "../components";



export default function TopQuizzesScreen() {
    return (
        <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center', p: 2, pl: 10, }}>
            <CommonTitle title='TOP QUIZZES' />
            {/* <Typography variant='h5'>TOP QUIZZES</Typography> */}
            <Grid container justifyContent='flex-start'>
                {quizzes.map((data) => <QuizCard key={data.id} {...data} />)}
            </Grid>
        </Grid>
    );
}


const quizzes = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
];