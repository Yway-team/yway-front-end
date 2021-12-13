import {
    Card,
    CardContent,
    Typography,
    CardActionArea,
    Grid,
    Avatar
} from '@mui/material';
import TimeAgoFromNow from './TimeAgoFromNow';
import LinesEllipsis from 'react-lines-ellipsis';
// import { useHistory } from 'react-router-dom';



// Achievement {
//     name: String,
//         description: String,
//             icon: Binary data,
//                 playPointValue: Int,
//                     creatorPointValue: Int
// }



function AchievementCard({ name, description, icon, lastEarned }) {

    return (
        <Card sx={{ maxWidth: 500, elevation: 0, boxShadow: 'none', height: 120, my: 2, position: 'relative' }}>
            <Grid container direction='row' justifyContent='center' alignItems='center' p={2} >
                <Grid item xs={2} container>
                    <Avatar alt="creator-avatar" src={icon} sx={{ height: 80, width: 80 }} />
                </Grid>
                <Grid xs={9} item container direction='column' justifyContent='center' alignItems='baseline' sx={{ height: 100, flexWrap: 'none' }} flexGrow={1} ml={4}  >
                    <Grid xs={2} container item direction='row' alignItems='center' justifyContent='space-between'>
                        <Typography sx={{ fontSize: 16, fontWeight: 600 }}> {name} </Typography>
                    </Grid>
                    <Grid xs={2} item container sx={{ fontSize: 14, fontWeight: 500, color: 'grey.600', fontFamily: "'Montserrat', sans-serif", width: 300, height: 40, overFlow: 'hidden', mt: '8px' }}>
                        <LinesEllipsis
                            text={description}
                            maxLine='2'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                            component='p'
                        />
                    </Grid>
                    <Grid xs={2} item>
                        <Typography sx={{ fontSize: 12, mt: 1, fontWeight: 600, color: 'primary.main', textAlign: 'right' }}> <TimeAgoFromNow dateIn={Date.parse(lastEarned)} /> </Typography>
                    </Grid>

                    {/* <Grid xs={2} sm={5} item container flexDirection='row' justifyContent='flex-start' alignItems='center' flexGrow={1} spacing={0}>
                                <Box sx={{ textOverflow: "elipsis", height: 40, width: 400, overflow: 'hidden', mt: '8px' }}> <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'grey.600' }}> {description}</Typography> </Box>


                            </Grid> */}
                </Grid>
            </Grid>
            {/* <Button
                variant='contained'

                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    background: 'primary.main',
                    boxShadow: 'none',
                    height: 28,
                    px: 2,
                    m: 1,
                    color: 'common.white',
                    "&:hover": {
                        boxShadow: 'none',
                        backgroundColor: 'primary.light',
                        color: 'primary.main',
                    }
                }}
            > FAVORITE</Button> */}
        </Card >);
}

export default AchievementCard;