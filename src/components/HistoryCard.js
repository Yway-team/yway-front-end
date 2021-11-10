import {
    Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    Link,
    CardActionArea
} from '@mui/material';
import TimeAgoFromNow from './TimeAgoFromNow';
// import LinesEllipsis from 'react-lines-ellipsis';
// import { useHistory } from 'react-router-dom';


function HistoryCard({ _id, type, first, link, second, image, timestamp }) {
    var description;
    if (type === 'quiz') {
        description = <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'common.black', }}>{first} <Link> {link} </Link> {second} </Typography>;
    }
    return (
        <Card sx={{ width: 600, elevation: 0, boxShadow: 'none', height: 90, position: 'relative', my: 1, mb: 2 }}>
            <CardActionArea>
                <CardContent sx={{ p: 1 }}>
                    <Grid container direction='row' justifyContent='flex-start'>
                        <Grid item container alignItems='flex-start' xs={1} md={1} sx={{ height: 80 }} >
                            <Avatar alt="history-avatar" src={image} sx={{ height: 50, width: 50, m: 1 }} />
                        </Grid>
                        <Grid xs={10} item container direction='column' justifyContent='flex-start' alignItems='baseline' sx={{ height: 80, flexWrap: 'none', ml: 3 }}  >
                            <Grid xs={3} item container sx={{ fontFamily: "'Montserrat', sans-serif", overFlow: 'hidden', mt: 1, height: 30, }}>
                                {/* <LinesEllipsis sx={{ display: 'flex-box' }}
                                text={description}
                                maxLine='1'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                            /> */}
                                {description}
                            </Grid>
                            <Grid xs={2} item>
                                <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'primary.main', textAlign: 'right', mt: 2 }}> <TimeAgoFromNow dateIn={timestamp} /> </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card >);
}

export default HistoryCard;

