import { Grid } from '@mui/material';
import { QuizCard, CommonTitle } from "../components";
import usePrivilegedQuery from '../hooks/usePrivilegedQuery';
import { GET_DRAFTS_INFO } from '../controllers/graphql/user-queries';

export default function DraftsScreen() {
    const { data: draftData, refetch: refetchDrafts } = usePrivilegedQuery(GET_DRAFTS_INFO);
    let drafts = null;
    if (draftData) {
        drafts = draftData.getDraftsInfo;
    }
    return (
        <Grid container direction="column" sx={{ alignItems: 'center', justifyContent: 'center', p: 2, pl: 10, }}>
            <CommonTitle title='DRAFTS' />
            <Grid container justifyContent='flex-start'>
                {drafts ? drafts.map((draft) => {
                    return (<QuizCard key={draft._id} {...draft} refetch={refetchDrafts} draft={true} />);
                }) : null}
            </Grid>
        </Grid>
    );
}

