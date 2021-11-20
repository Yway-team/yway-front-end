import { Grid } from '@mui/material';
import { QuizCard, CommonTitle } from "../components";
import { useQuery } from '@apollo/client';
import { GET_QUIZ_HIGHLIGHTS } from '../controllers/graphql/quiz-queries';


export default function TopQuizzesScreen() {
    const { data: quizData } = useQuery(GET_QUIZ_HIGHLIGHTS, { variables: { howMany: 20 } });
    let quizzes = null;
    if (quizData) {
        quizzes = quizData.getQuizHighlights;
    }
    return (
        <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center', p: 2, pl: 10, }}>
            <CommonTitle title='TOP QUIZZES' />
            <Grid container justifyContent='flex-start'>
                {quizzes ? quizzes.map((data) => <QuizCard key={data._id} {...data} />) : null}
            </Grid>
        </Grid>
    );
}

