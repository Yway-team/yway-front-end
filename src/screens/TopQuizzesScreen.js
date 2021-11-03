import {Box, Typography, Container, Grid} from '@mui/material';
import QuizCard from "../components/QuizCard";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function TopQuizzesScreen() {
    return (
        <Grid container direction="column" sx={{alignItems: 'center', justifyContent: 'center'}}>
            <Typography gutterBottom variant='h5' color='primary'>
                Top Quizzes Screen
            </Typography>
            <Grid container spacing={4}>
                {cards.map(() => (
                    <Grid item xs={12} sm={6} md={4}>
                        <QuizCard>
                        </QuizCard>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}
