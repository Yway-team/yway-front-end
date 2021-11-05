import { Box, Typography, Container, Grid } from '@mui/material';

import { QuizCard, CommonTitle } from "../components";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function TopQuizzesScreen() {
    return (
        <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center', p: 2 }}>
            <Grid container justifyContent='flex-start'>
                <CommonTitle title='TOP QUIZZES' />
                {cards.map((index) => <QuizCard />)}
            </Grid>

        </Grid>
    );
}
