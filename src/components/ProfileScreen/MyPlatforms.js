import { Grid } from '@mui/material';
import { CommonTitle, PlatformCard } from '..';
import { useQuery } from '@apollo/client';


import { GET_PLATFORM_HIGHLIGHTS } from '../../controllers/graphql/platform-queries';
export default function MyPlatforms() {
    const { data: platformData } = useQuery(GET_PLATFORM_HIGHLIGHTS, { variables: { howMany: 10 } });
    let platforms = null;
    if (platformData) {
        platforms = platformData.getPlatformHighlights;
    }

    return (
        <Grid container direction='column' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', py: 2 }}>
            {/* history section */}
            <Grid container justifyContent='flex-start' pl={3}>
                <CommonTitle title='MY QUIZZES' />
            </Grid>
            <Grid container justifyContent='flex-start' mb={1}>
                {platforms ? platforms.map((data) => <PlatformCard key={data._id} {...data} />) : null}
            </Grid>

        </Grid >
    );
}



