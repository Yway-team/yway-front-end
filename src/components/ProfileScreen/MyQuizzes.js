import { Grid } from '@mui/material';
import { CommonTitle, QuizCard } from '..';
import { useQuery } from '@apollo/client';
import { GET_USER_QUIZZES_INFO } from '../../controllers/graphql/user-queries';
import { useParams } from 'react-router';

export default function MyQuizzes() {
    const { userId } = useParams();
    const { data: quizData } = useQuery(GET_USER_QUIZZES_INFO, { variables: { userId: userId } });
    let quizzes = null;
    if (quizData) {
        quizzes = quizData.getUserQuizzesInfo;
    }




    return (
        <Grid container direction='column' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', py: 2 }}>
            {/* history section */}
            <Grid container justifyContent='flex-start' pl={3}>
                <CommonTitle title='MY QUIZZES' />
            </Grid>
            <Grid container justifyContent='flex-start' mb={1}>
                {quizzes ? quizzes.map((data) => <QuizCard key={data._id} {...data} />) : null}
            </Grid>

        </Grid >
    );
}
