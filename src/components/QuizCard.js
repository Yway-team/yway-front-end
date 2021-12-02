import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Dialog,
    Grid,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import {DeleteOutlined, EditOutlined, LocalOfferOutlined, MoreVertRounded} from '@mui/icons-material';
import logoIcon from '../images/logoIcon.svg';
import {useState} from 'react';
import TimeAgoFromNow from './TimeAgoFromNow';
import LinesEllipsis from 'react-lines-ellipsis';
import {useMutation} from '@apollo/client';
import {DELETE_QUIZ} from '../controllers/graphql/quiz-mutations';
import {useHistory} from 'react-router-dom';
import { DELETE_DRAFT } from '../controllers/graphql/user-mutations';


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
//                             createdAt: Date,
//                                 platform: String,
//                                     name: String
//                                          platformThumbnail
//                                             draft: boolean
// }


function QuizCard({
                      _id,
                      title,
                      bannerImg,
                      description,
                      numQuestions,
                      ownerId,
                      ownerUsername,
                      ownerAvatar,
                      rating,
                      createdAt,
                      platformId,
                      platformName,
                      platformThumbnail,
                      draft
                  }) {
    const [open, setOpen] = useState(false);
    // const draft = _id ? false : true;
    draft = draft ? draft : false;
    var attempted = true;
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const openQuizEditMenu = Boolean(anchorEl);
    const [deleteQuiz] = useMutation(DELETE_QUIZ);
    const [deleteDraft] = useMutation(DELETE_DRAFT);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleQuizEditMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleQuizEditMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteQuiz = async () => {
        await deleteQuiz({variables: {quizId: _id}});
    }

    const handleDeleteDraft = async () => {
        await deleteDraft({ variables: { draftId: _id } });
    }

    const menuTypography = (text) => <Typography
        sx={{fontWeight: '500', fontSize: 14, color: '#858585', my: 1}}>{text}</Typography>;


    return (
        <>
            <Card onClick={handleClickOpen}
                  sx={{maxWidth: 300, elevation: 0, boxShadow: 'none', m: 3, borderRadius: '10px 10px 10px 10px'}}>
                <CardActionArea>

                    <CardMedia
                        component="img"
                        height={130}
                        image={bannerImg}
                        alt="quiz image"
                        sx={{borderRadius: '10px 10px 0px 0px', zIndex: '-2'}}/>

                    <CardContent sx={{py: 2, px: 1}}>
                        <Grid container justifyContent='flex-end'
                              sx={{zIndex: 1, position: 'absolute', left: 0, top: 130 - 25}}>
                            <Grid container alignItems='center' justifyContent='center' sx={{
                                width: 100,
                                height: 25,
                                backgroundColor: draft ? 'rgba(250, 250, 252, 0.75)' : 'primary.main',
                                borderRadius: '10px 0px 0px 0px'
                            }}>
                                <Typography sx=
                                                {{
                                                    color: draft ? 'grey.700' : 'common.white',
                                                    fontSize: 12,
                                                    fontWeight: 500
                                                }}>
                                    {`${numQuestions} questions`}
                                </Typography>
                            </Grid>
                        </Grid>
                        {(draft || attempted) ?
                            <Grid container justifyContent='flex-start'
                                  sx={{zIndex: 1, position: 'absolute', left: -34, top: 14}}>
                                <Grid container alignItems='center' justifyContent='center' sx={{
                                    width: 130,
                                    height: 25,
                                    backgroundColor: 'rgba(250, 250, 252, 0.75)',
                                    transform: "rotate(-36deg)"
                                }}>
                                    <Typography sx=
                                                    {{color: 'grey.700', fontSize: 12, fontWeight: 600}}>
                                        {draft ? 'Draft' : 'Attempted'}
                                    </Typography>
                                </Grid>
                            </Grid> : null}
                        <Box sx={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: 'common.black',
                            fontFamily: "'Montserrat', sans-serif",
                            height: 40
                        }}>
                            <LinesEllipsis
                                text={title}
                                maxLine='2'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                            />
                        </Box>
                        <Grid container sx={{mt: 1}} justifyContent='space-between' spacing={1}>
                            <Grid item container xs={6} alignItems='center'>
                                <img src={logoIcon} style={{height: 15}} alt='' />
                                <Typography sx={{
                                    fontSize: 14,
                                    ml: 1,
                                    fontWeight: 500,
                                    color: 'grey.600'
                                }}> {rating}</Typography>
                            </Grid>
                            <Grid item xs={6} alignItems='center' justifyContent='flex-end'>
                                <Typography
                                    sx={{fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600', textAlign: 'right'}}>
                                    <TimeAgoFromNow dateIn={createdAt}/> </Typography>
                            </Grid>
                            <Grid item container xs={6} alignItems='center'>
                                <Avatar alt="creator-avatar" src={ownerAvatar} sx={{height: 14, width: 14}}/>
                                <Box sx={{overflow: 'hidden', textOverflow: 'ellipsis', width: '120px'}}>
                                    <Typography noWrap sx={{
                                        fontSize: 14,
                                        ml: 1,
                                        fontWeight: 500,
                                        color: 'grey.600'
                                    }}> {ownerUsername} </Typography>
                                </Box>
                            </Grid>
                            <Grid item container xs={6} alignItems='center' justifyContent='flex-end'>
                                <Avatar alt="creator-avatar" src={platformThumbnail} sx={{height: 14, width: 14}}/>
                                <Box sx={{overflow: 'hidden', textOverflow: 'ellipsis', width: '120px'}}>
                                    <Typography noWrap sx={{
                                        fontSize: 14,
                                        ml: 1,
                                        fontWeight: 500,
                                        color: 'grey.600',
                                        textAlign: 'right'
                                    }}> {platformName} </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Dialog open={open} onClose={handleClose}
                    aria-labelledby="quiz-details-dialog" sx={{backgroundColor: 'transparent'}}>
                <Card sx={{width: 600, elevation: 0, boxShadow: 'none'}}>

                    <CardMedia
                        component="img"
                        height={200}
                        image={bannerImg}
                        alt="quiz image"
                    />

                    <CardContent sx={{p: 5}}>
                        <Grid container justifyContent='flex-end'
                              sx={{zIndex: 1, position: 'absolute', left: 0, top: 200 - 30}}>
                            <Grid container alignItems='center' justifyContent='center' sx={{
                                width: 120,
                                height: 30,
                                backgroundColor: 'primary.main',
                                borderRadius: '10px 0px 0px 0px'
                            }}>
                                <Typography sx=
                                                {{color: 'common.white'}}>
                                    {`${numQuestions} questions`}
                                </Typography>
                            </Grid>

                        </Grid>
                        <Grid container justifyContent='space-between' alignItems='center' sx={{
                            overflow: "hidden", textOverflow: "ellipsis",
                        }}>
                            <Typography sx={{fontSize: 16, fontWeight: 600, color: 'common.black'}}>
                                {title}
                            </Typography>
                            <IconButton sx={{backgroundColor: openQuizEditMenu ? 'primary.main' : 'grey.50'}}
                                        onClick={handleQuizEditMenuClick}>
                                <MoreVertRounded sx={{fill: openQuizEditMenu ? 'white' : 'grey.500'}}/>
                            </IconButton>

                        </Grid>
                        <Typography sx={{fontSize: 14, fontWeight: 500, color: 'grey.600', my: 2}}>
                            {description}
                        </Typography>
                        <Grid container sx={{mt: 1}} justifyContent='space-between' spacing={1}>
                            <Grid item container xs={6} alignItems='center'>
                                <img src={logoIcon} style={{height: 15}}/>
                                <Typography sx={{
                                    fontSize: 14,
                                    ml: 1,
                                    fontWeight: 500,
                                    color: 'grey.600'
                                }}> {rating}</Typography>
                            </Grid>
                            <Grid item xs={6} alignItems='center' justifyContent='flex-end'>
                                <Typography
                                    sx={{fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600', textAlign: 'right'}}>
                                    <TimeAgoFromNow dateIn={createdAt}/></Typography>
                            </Grid>
                            <Grid item container xs={6} alignItems='center'>
                                <Avatar alt="creator-avatar" src={ownerAvatar} sx={{height: 14, width: 14}}/>
                                <Typography sx={{
                                    fontSize: 14,
                                    ml: 1,
                                    fontWeight: 500,
                                    color: 'grey.600'
                                }}> {ownerUsername} </Typography>
                            </Grid>
                            <Grid item container xs={6} alignItems='center' justifyContent='flex-end'>
                                <Avatar alt="creator-avatar" src={platformThumbnail} sx={{height: 14, width: 14}}/>

                                <Typography sx={{
                                    fontSize: 14,
                                    ml: 1,
                                    fontWeight: 500,
                                    color: 'grey.600',
                                    textAlign: 'right'
                                }}> {platformName} </Typography>

                            </Grid>

                            <Button
                                variant='contained'
                                onClick={() => {
                                    history.push('/quiz/take/' + _id);
                                }
                                }
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
                        <Menu
                            anchorEl={anchorEl}
                            open={openQuizEditMenu}
                            onClose={handleQuizEditMenuClose}
                            onClick={handleQuizEditMenuClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    '& .MuiMenuItem-root': {
                                        px: 2,
                                    },
                                    '& .MuiSvgIcon-root': {
                                        ml: 1,
                                        mr: 3,
                                        my: 0.5,
                                        fill: '#858585',
                                        fontSize: 19,
                                    },
                                    "&:before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform: "translateY(-50%) rotate(45deg)",
                                        zIndex: 0
                                    }
                                }
                            }}
                            transformOrigin={{horizontal: "right", vertical: "top"}}
                            anchorOrigin={{horizontal: "right", vertical: "bottom"}}>

                            <MenuItem onClick={() => {
                                history.push(`/quiz/edit/${_id}`);
                            }}>
                                <ListItemIcon>
                                    <EditOutlined/>
                                </ListItemIcon>
                                {menuTypography(draft ? 'Edit Draft' :'Edit Quiz')}
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon>
                                    <LocalOfferOutlined/>
                                </ListItemIcon>
                                {menuTypography('Edit Tags')}
                            </MenuItem>

                            <MenuItem onClick={draft ? handleDeleteDraft : handleDeleteQuiz}>
                                <ListItemIcon>
                                    <DeleteOutlined/>
                                </ListItemIcon>
                                {menuTypography(draft ? 'Delete Draft' : 'Delete Quiz')}
                            </MenuItem>
                        </Menu>
                    </CardContent>


                </Card>
            </Dialog>
        </>
    );
}

export default QuizCard;