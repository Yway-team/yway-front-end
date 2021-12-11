import { Grid, Typography } from '@mui/material';
import { CommonTitle, QuizCard } from '..';
import { GET_USER_QUIZZES_INFO } from '../../controllers/graphql/user-queries';
import usePrivilegedQuery from '../../hooks/usePrivilegedQuery';

export default function MyQuizzes({ userId, isOwn, username }) {
    const { data: quizData, refetch } = usePrivilegedQuery(GET_USER_QUIZZES_INFO, { variables: { userId: userId } });
    let quizzes = [];
    if (quizData) {
        quizzes = quizData.getUserQuizzesInfo;
    }

    return (
        <Grid container direction='column' sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 2 }}>
            {quizzes ?
                <>
                    <Grid container justifyContent='flex-start' pl={3} >
                        <CommonTitle title={`${isOwn ? 'MY ' : (username.toUpperCase() + '\'S ' || '')}QUIZZES`} />
                    </Grid>
                    <Grid container justifyContent='flex-start' mb={1}>
                        {quizzes ? quizzes.map((data) => <QuizCard key={data._id} {...data} refetch={refetch} />) : null}
                    </Grid>
                    {quizzes.length === 0 ? <Typography pl={3}> {`You have no quizzes.`} </Typography> : null}

                </>
                : <Typography> {`This user's profile is private.`} </Typography>}
        </Grid >
    );
}
