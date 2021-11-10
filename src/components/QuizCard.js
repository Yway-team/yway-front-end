import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea,
    Grid,
    Box,
    Avatar,
    Dialog,
    Button
} from '@mui/material';
import logoIcon from '../images/logoIcon.svg';
import { useState } from 'react';
import TimeAgoFromNow from './TimeAgoFromNow';
import LinesEllipsis from 'react-lines-ellipsis';
// import { globalState } from '../state/UserState';
// import { useHistory } from 'react-router-dom';


// quizCard - All necessary information for a summarized display of the platform.
//added _id
// {
//    _id: String
//     thumbnail: Binary data,
//         description: String,
//             numQuestions: Int,
//                 creator: String,
//                     creatorImage: Binary data,
//                         rating: Double,
//                             timestamp: Date,
//                                 platform: String,
//                                     name: String
//                                          platformThumbnail
//                                             draft: boolean
// }



function QuizCard({ _id, title, bannerImg, description, numQuestions, ownerId, ownerUsername, ownerAvatar, rating, createdAt, platformId, platformName, platformThumbnail, draft }) {
    const [open, setOpen] = useState(false);
    // const draft = _id ? false : true;
    draft = draft ? draft : false;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    var attempted = true;

    return (
        <>
            <Card onClick={handleClickOpen} sx={{ maxWidth: 300, elevation: 0, boxShadow: 'none', m: 3, borderRadius: '10px 10px 10px 10px' }}>
                <CardActionArea >

                    <CardMedia
                        component="img"
                        height={130}
                        image={bannerImg}
                        alt="quiz image"
                        sx={{ borderRadius: '10px 10px 0px 0px', zIndex: '-2' }} />

                    <CardContent sx={{ py: 2, px: 1 }}>
                        <Grid container justifyContent='flex-end' sx={{ zIndex: 1, position: 'absolute', left: 0, top: 130 - 25 }}>
                            <Grid container alignItems='center' justifyContent='center' sx={{ width: 100, height: 25, backgroundColor: draft ? 'rgba(250, 250, 252, 0.75)' : 'primary.main', borderRadius: '10px 0px 0px 0px' }}>
                                <Typography sx=
                                    {{ color: draft ? 'grey.700' : 'common.white', fontSize: 12, fontWeight: 500 }}>
                                    {`${numQuestions} questions`}
                                </Typography>
                            </Grid>
                        </Grid>
                        {(draft || attempted) ?
                            <Grid container justifyContent='flex-start' sx={{ zIndex: 1, position: 'absolute', left: -34, top: 14 }}>
                                <Grid container alignItems='center' justifyContent='center' sx={{ width: 130, height: 25, backgroundColor: 'rgba(250, 250, 252, 0.75)', transform: "rotate(-36deg)" }}>
                                    <Typography sx=
                                        {{ color: 'grey.700', fontSize: 12, fontWeight: 600 }}>
                                        {draft ? 'Draft' : 'Attempted'}
                                    </Typography>
                                </Grid>
                            </Grid> : null}
                        <Box sx={{ fontSize: 16, fontWeight: 600, color: 'common.black', fontFamily: "'Montserrat', sans-serif", height: 40 }}>
                            <LinesEllipsis
                                text={title}
                                maxLine='2'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                            />
                        </Box>
                        <Grid container sx={{ mt: 1 }} justifyContent='space-between' spacing={1} >
                            <Grid item container xs={6} alignItems='center'>
                                <img src={logoIcon} style={{ height: 15 }} />
                                <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600' }}> {rating}</Typography>
                            </Grid>
                            <Grid item xs={6} alignItems='center' justifyContent='flex-end'>
                                <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600', textAlign: 'right' }}> <TimeAgoFromNow dateIn={createdAt} /> </Typography>
                            </Grid>
                            <Grid item container xs={6} alignItems='center'>
                                <Avatar alt="creator-avatar" src={ownerAvatar} sx={{ height: 14, width: 14 }} />
                                <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '120px' }}>
                                    <Typography noWrap sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600' }}> {ownerUsername} </Typography>
                                </Box>
                            </Grid>
                            <Grid item container xs={6} alignItems='center' justifyContent='flex-end'>
                                <Avatar alt="creator-avatar" src={platformThumbnail} sx={{ height: 14, width: 14 }} />
                                <Box sx={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '120px' }}>
                                    <Typography noWrap sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600', textAlign: 'right' }}> {platformName} </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card >

            <Dialog open={open} onClose={handleClose}
                aria-labelledby="quiz-details-dialog" sx={{ backgroundColor: 'transparent' }}  >
                <Card sx={{ width: 600, elevation: 0, boxShadow: 'none' }}>

                    <CardMedia
                        component="img"
                        height={200}
                        image={bannerImg}
                        alt="quiz image"
                    />

                    <CardContent sx={{ p: 5 }}>
                        <Grid container justifyContent='flex-end' sx={{ zIndex: 1, position: 'absolute', left: 0, top: 200 - 30 }}>
                            <Grid container alignItems='center' justifyContent='center' sx={{ width: 120, height: 30, backgroundColor: 'primary.main', borderRadius: '10px 0px 0px 0px' }}>
                                <Typography sx=
                                    {{ color: 'common.white' }}>
                                    {`${numQuestions} questions`}
                                </Typography>
                            </Grid>

                        </Grid>
                        <Box sx={{
                            overflow: "hidden", textOverflow: "ellipsis",
                            // 'display': '-webkit-box',
                            // '-webkit-line-clamp': 2, 'line-clamp': 2, '-webkit-box-orient': 'vertical'
                        }}>
                            <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'common.black' }}>
                                {title}
                            </Typography>

                        </Box>
                        <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'grey.600', my: 2 }}>
                            {description}
                        </Typography>
                        <Grid container sx={{ mt: 1 }} justifyContent='space-between' spacing={1} >
                            <Grid item container xs={6} alignItems='center'>
                                <img src={logoIcon} style={{ height: 15 }} />
                                <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600' }}> {rating}</Typography>
                            </Grid>
                            <Grid item xs={6} alignItems='center' justifyContent='flex-end'>
                                <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600', textAlign: 'right' }}> <TimeAgoFromNow dateIn={createdAt} /></Typography>
                            </Grid>
                            <Grid item container xs={6} alignItems='center'>
                                <Avatar alt="creator-avatar" src={ownerAvatar} sx={{ height: 14, width: 14 }} />
                                <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600' }}> {ownerUsername} </Typography>
                            </Grid>
                            <Grid item container xs={6} alignItems='center' justifyContent='flex-end'>
                                <Avatar alt="creator-avatar" src={platformThumbnail} sx={{ height: 14, width: 14 }} />

                                <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600', textAlign: 'right' }}> {platformName} </Typography>

                            </Grid>

                            <Button
                                variant='contained'
                                sx={{
                                    alignSelf: 'end',
                                    background: 'primary.main',
                                    boxShadow: 'none',
                                    mt: 5,
                                    px: 3,
                                    color: 'common.white',
                                    "&:hover": {
                                        boxShadow: 'none',
                                        backgroundColor: 'primary.light',
                                        color: 'primary.main',
                                    }
                                }
                                }
                            > BEGIN QUIZ</Button>


                        </Grid>

                    </CardContent>



                </Card >
            </Dialog>
        </>
    );
}

export default QuizCard;