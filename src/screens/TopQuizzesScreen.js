import { Grid, CircularProgress } from '@mui/material';
import { QuizCard, CommonTitle } from "../components";
import { useQuery } from '@apollo/client';
import { GET_TOP_QUIZZES } from '../controllers/graphql/quiz-queries';


export default function TopQuizzesScreen() {
    const { data: quizData, refetch, loading } = useQuery(GET_TOP_QUIZZES, { variables: { howMany: 20 } });
    let quizzes = null;
    if (loading) {
        return (
            <Grid container justifyContent='center' alignItems='center' sx={{ height: '60vh', width: '100%' }}>
                <CircularProgress variant='indeterminate' color='primary' />
            </Grid>
        );
    }
    if (quizData) {
        quizzes = quizData.getTopQuizzes;
    }
    return (
        <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center', p: 2, pl: 10, }}>
            <CommonTitle title='TOP QUIZZES' />
            <Grid container justifyContent='flex-start'>
                {quizzes ? quizzes.map((data) => <QuizCard key={data._id} {...data} refetch={refetch} />) : null}
            </Grid>
        </Grid>
    );
}

