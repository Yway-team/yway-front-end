import { Grid, CircularProgress, Typography } from '@mui/material';
import { QuizCard, CommonTitle } from "../components";
import usePrivilegedQuery from '../hooks/usePrivilegedQuery';
import { GET_DRAFTS_INFO } from '../controllers/graphql/user-queries';
import { useEffect } from 'react';

export default function DraftsScreen() {
    const { data: draftData, refetch: refetchDrafts, loading } = usePrivilegedQuery(GET_DRAFTS_INFO);
    let drafts = null;
    useEffect(() => {
        refetchDrafts();
    }, [refetchDrafts]);

    if (loading) {
        return (
            <Grid container justifyContent='center' alignItems='center' sx={{ height: '40vh', width: '100%' }}>
                <CircularProgress variant='indeterminate' color='primary' />
            </Grid>

        );
    }
    if (draftData) {
        drafts = draftData.getDraftsInfo;
    }



    return (
        <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center', p: 2, pl: 10, }}>
            <CommonTitle title='DRAFTS' />
            <Grid container justifyContent='flex-start'>
                {drafts ? drafts.length === 0 ? <Typography> You don't have any drafts.
                </Typography> : drafts.map((draft) => {
                    return (<QuizCard key={draft._id} {...draft} refetch={refetchDrafts} draft={true} />);
                }) : null}
            </Grid>
        </Grid>
    );
}

