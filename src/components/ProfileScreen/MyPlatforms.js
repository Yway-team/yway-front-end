import { Grid, Typography } from '@mui/material';
import { CommonTitle, PlatformCard } from '..';
import { GET_USER_PLATFORMS_INFO } from '../../controllers/graphql/user-queries';
import usePrivilegedQuery from '../../hooks/usePrivilegedQuery';

export default function MyPlatforms({ userId, isOwn, username }) {
    const { data: platformData } = usePrivilegedQuery(GET_USER_PLATFORMS_INFO, { variables: { userId: userId } });
    let platforms = [];
    if (platformData) {
        platforms = platformData.getUserPlatformsInfo;
    }

    return (
        <Grid container direction='column' sx={{ display: 'flex', justifyContent: 'center', width: '100%', py: 2 }}>
            {/* history section */}
            <Grid container justifyContent='flex-start' pl={3}>
                <CommonTitle title={`${isOwn ? 'MY ' : (username.toUpperCase() + '\'S ' || '')}PLATFORMS`} />
            </Grid>
            <Grid container justifyContent='flex-start' mb={1}>
                {platforms ? platforms.map((data) => <PlatformCard key={data._id} {...data} />) : null}
            </Grid>
            {platforms.length == 0 ? <Typography pl={3}> {`There is no platform yet.`} </Typography> : null}
        </Grid >
    );
}
