import { Grid, Avatar, Typography, Stack, LinearProgress, ButtonBase, Slide, Fade } from '@mui/material';
import { ReactComponent as Background } from '../images/blop.svg';
import { Bolt } from '@mui/icons-material';
import { globalState } from '../state/UserState';
import { useEffect, useState } from 'react';
export default function TakeQuizScreen() {
    var color = '#2f80ed';
    var platformThumbnail = '';
    var platformName = 'Platform101';
    var title = 'This is like pretty long title with everything you would need to figure it out? ';
    var ownerUsername = 'IamTheOwner124';
    var ownerAvatar = '';
    var user = globalState();
    var playPoints = user.playPoints;
    const [index, setIndex] = useState(0);


    var questionList = [
        {
            _id: '012243',
            answerOptions: ['Option1', 'Option2', 'Option3', 'Option4'],
            correctAnswerIndex: 1,
            description: 'Option 2 is correct. Please choose option 2. This is a real question.',
            quiz: '01232',
            attemptTotal: 0,
            correctAttempts: 0,
            platform: '01244'
        },
        {
            _id: '012243',
            answerOptions: ['Option1', 'Option2', 'Option3', 'Option4'],
            correctAnswerIndex: 2,
            description: 'Option 3 is correct. Please choose option 2. This is a real question.',
            quiz: '01232',
            attemptTotal: 0,
            correctAttempts: 0,
            platform: '01244'
        },
        {
            _id: '012243',
            answerOptions: ['Option1', 'Option2', 'Option3', 'Option4'],
            correctAnswerIndex: 2,
            description: 'Option 3 is correct. Please choose option 2. This is a real question.',
            quiz: '01232',
            attemptTotal: 0,
            correctAttempts: 0,
            platform: '01244'
        }
    ];






    function handleAnswer() {
        if (index < questionList.length) {
            var newIndex = index + 1;
            setIndex(newIndex);
        }

    };



    return (
        <Stack direction="column" justifyContent='space-between' alignItems='center' height={window.innerHeight - 64} >
            <Stack container direction='row' justifyContent='space-between' sx={{ width: '100%' }}>
                <Stack container pl={7} pt={3} direction='row'>
                    <Avatar src={platformThumbnail} alt='paltform-avatar' sx={{
                        width: '30pt',
                        height: '30pt'
                    }} />
                    <Stack container justifyContent='flex-start' ml={2} >
                        <Stack direction='row' sx={{ height: '30pt', justifyContent: 'center', alignItems: 'flex-start', mt: '5pt', }}>
                            <Typography variant='h5' sx={{ color: { color }, flexGrow: 1, fontSize: 16 }}> {(platformName + ':')}  </Typography>
                            <Typography variant='h5' sx={{ color: 'grey.600', ml: 1, fontSize: 16 }}> {title}  </Typography>
                        </Stack>
                        <Stack direction='row' >
                            <Avatar src={ownerAvatar} alt='paltform-avatar' sx={{
                                width: 20,
                                height: 20,
                                mr: 1
                            }} />
                            <Typography sx={{ fontSize: 14, color: 'grey.600', fontWeight: 600, }}> {ownerUsername} </Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Grid container xs={3} direction='column' sx={{ color: { color }, position: 'relative', width: 350, height: 150, overflow: 'hidden' }}>
                    <Stack justifyContent='center' sx={{ zIndex: 2, width: 200, position: 'absolute', right: -50, top: 10, pt: 0.5 }}>
                        <Typography sx={{ color: 'common.white', fontSize: 18, fontWeight: 600 }}> Play Points </Typography>
                        <Stack direction='row' alignItems='center ' sx={{ mt: 1, ml: 2 }} >
                            <Typography sx={{ color: 'common.white', fontSize: 24, fontWeight: 600 }}> {playPoints} </Typography>
                            <Bolt sx={{ fill: 'white', fontSize: 28, ml: 1 }} />
                        </Stack>
                    </Stack>
                    <Stack sx={{
                        position: 'absolute', top: -20, right: -65, height: 150,
                    }}>
                        <Background fill={color} />
                    </Stack>
                </Grid>
            </Stack>
            {index < questionList.length ? <Question
                index={index}
                color={color}
                question={questionList[index]}
                handleAnswer={() => handleAnswer()}
                key={questionList[index]._id}
            /> : null}
            <Stack sx={{
                width: '100%',
                color: { color }
            }}>
                <LinearProgress variant="determinate" value={20} color='inherit' sx={{
                    height: 12,
                    [`& .MuiLinearProgress-bar`]: {
                        borderRadius: 2,
                    },
                }} />
            </Stack>

        </Stack >);
}


function Question({ index, color, question, handleAnswer }) {
    const [exit, setExit] = useState(true);

    function Option({ option, index }) {
        var feedbackColor = index === question.correctAnswerIndex ? '#219653' : '#EB5757';
        const [clicked, setClicked] = useState(false);
        useEffect(() => {
            if (clicked) {
                setTimeout(() => {
                    setExit(false);
                    handleAnswer();
                }, 2000);

            }
        }, [clicked]);

        return (
            <Grid item xs={5} mr={2} >
                <ButtonBase
                    onClick={() => {
                        setClicked(true);
                    }
                    }
                    sx={{
                        minWidth: '70%',
                        minHeight: 50,
                        backgroundColor: clicked ? feedbackColor : 'grey.400',
                        borderRadius: '5pt',
                        "&:hover": {
                            backgroundColor: color,
                        }
                    }}>
                    <Stack direction='row'
                        justifyContent='flex-start'
                        alignItems='center'
                        pl={2}
                        py={0.5}
                        sx={{
                            height: '100%',
                            minHeight: 50,
                            width: '95%',
                            backgroundColor: clicked ? '#ffffffd5' : 'grey.200',
                            ml: '5%',
                            borderRadius: '0pt 5pt 5pt 0pt',
                            "&:hover": {
                                backgroundColor: '#ffffffd5',
                            }
                        }}>
                        <Typography sx={{
                            fontSize: 16,
                            fontWeight: 600,
                        }}>{option}</Typography>
                    </Stack>
                </ButtonBase>
            </Grid >
        );
    }

    return (
        <Fade in={exit} timeout={{ exit: 500, appear: 800, }}  >
            <Stack>
                <Slide in={exit} direction='right' appear={false} timeout={{ exit: 800 }}
                    unmountOnExit
                    onExited={() => {
                        setExit(true);
                    }}>


                    <Stack sx={{ width: '100%', mr: 10 }} >
                        <Stack alignItems='center' direction='row'>
                            <Avatar sx={{ backgroundColor: color, width: '60pt', height: '60pt', fontSize: 26 }}> {index + 1}</Avatar>
                            <Typography sx={{ ml: '20pt', fontSize: 20, color: 'primary.black', fontWeight: 600 }}> {question.description}</Typography>
                        </Stack>
                        <Grid container direction='row' ml='80pt' mt={1} rowSpacing={2} justifyContent='flex-start' columnGap={1}>
                            {question.answerOptions.map((option, index) => <Option option={option} index={index} />)}
                        </Grid>
                    </Stack >
                </Slide>
            </Stack>
        </Fade>



    );
}

