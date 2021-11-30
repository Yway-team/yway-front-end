import { Grid, Avatar, Typography, Stack, LinearProgress, ButtonBase, Slide, Dialog, Button } from '@mui/material';
import { ReactComponent as Background } from '../images/blop.svg';
import { Bolt, Visibility, ArrowForward } from '@mui/icons-material';
import { globalState } from '../state/UserState';
import { useCallback, useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_QUESTION_INFO, GET_QUESTION_LIST, GET_QUIZ_INFO } from '../controllers/graphql/quiz-queries';
import { GET_PLATFORM_THUMBNAIL } from '../controllers/graphql/platform-queries'
import { useParams, useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logoIconColorless.svg';
export default function TakeQuizScreen({ draft }) {
    const history = useHistory();
    const { quizId } = useParams();
    const { data: questionListData } = useQuery(GET_QUESTION_LIST, { variables: { quizId: quizId } });
    const [getPlatformThumbnail, { data: platformData, loading: loadingPlatformData, refetch: refetchPlatformThumbnail }] = useLazyQuery(GET_PLATFORM_THUMBNAIL);
    const { data: quizData } = useQuery(GET_QUIZ_INFO, { variables: { quizId: quizId } });

    let color = '#2f80ed';
    let platformName = 'No platform';
    let platformThumbnail = '';
    let title = 'Untitled';
    let ownerUsername = '';
    let ownerAvatar = '';
    let attempted = 100;
    let rating = 4.5;

    const user = globalState();
    var initPlayPoint = user.playPoints ? user.playPoints : 0;
    const [playPoints, setPlayPoints] = useState(initPlayPoint);
    const [index, setIndex] = useState(0);
    const [enter, setEnter] = useState(true);
    const [open, setOpen] = useState(false);
    const [userRating, setUserRating] = useState(0);



    var timeLimit = 20 * 1000;
    const [timeProgress, setTimeProgress] = useState(timeLimit);
    const [timerOnOff, setTimerOnOff] = useState(false);

    let questionList = [];
    if (questionListData) {
        questionList = questionListData.getQuestionList;
    }
    let quiz;
    if (quizData) {
        quiz = quizData.getQuizInfo;
        color = quiz.color;
        title = quiz.title;
        ownerUsername = quiz.ownerUsername;
        ownerAvatar = quiz.ownerAvatar;
        platformName = quiz.platformName;
        if (!platformData && !loadingPlatformData) {
            getPlatformThumbnail({ variables: { title: platformName } });
        }
    }
    if (platformData) {
        platformThumbnail = platformData.getPlatformThumbnail;
    }

    useEffect(() => {
        var timer;
        if (timerOnOff) {
            timer = setInterval(() => {
                setTimeProgress((oldProgress) => {
                    if (oldProgress <= 0) {
                        console.log('Time is up');
                        handleTimeOut();
                        return timeLimit;
                    }
                    return oldProgress - 1000;
                }
                );
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [timerOnOff, timeLimit]);

    useEffect(() => {
        console.log('take question page render');
    });


    /*
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
            answerOptions: ['Q2  Option1', 'Q2  Option2', 'Q2  Option3', 'Q2  Option4'],
            correctAnswerIndex: 2,
            description: 'Q2 Option 3 is correct. Please choose option 2. This is a real question.',
            quiz: '01232',
            attemptTotal: 0,
            correctAttempts: 0,
            platform: '01244'
        },
        {
            _id: '012243',
            answerOptions: ['Q3  Option1', 'Q3  Option2', 'Q3 Option3', 'Q3 Option4'],
            correctAnswerIndex: 2,
            description: 'Option 3 is correct. Please choose option 2. This is a real question.',
            quiz: '01232',
            attemptTotal: 0,
            correctAttempts: 0,
            platform: '01244'
        }
    ];
    */

    const handleFinished = () => {
        console.log('all indexes are now done');
        handleTimerOff();
        setTimeProgress(0);
        setEnter(false);
        setOpen(true);
    };

    const handleNextQuestion = () => {
        var newIndex = index + 1;
        setIndex(newIndex);
        if (newIndex > questionList.length - 1) {
            handleFinished()
        }
    };

    function handleTimeOut() {
        var newIndex = index + 1;
        setIndex(newIndex);
        handleTimerOff();

        if (newIndex > questionList.length - 1) {
            handleFinished();
        }
    }

    const handleAnswer = (correct) => {
        if (correct) {
            console.log('handling answer');
            setPlayPoints(playPoints + 10);
        }
    }


    const handleTimerOn = useCallback(() => {
        console.log('timer is on');
        setTimeProgress(timeLimit);
        setTimerOnOff(true);
    }, [timeLimit]);

    const handleTimerOff = useCallback(() => {
        console.log('timer is now off');
        setTimerOnOff(false);
    }, []);

    const handleEnter = useCallback((enterValue) => {
        setEnter(enterValue);
    });

    const handleFinishSubmit = () => {
        history.push('/highlights');
    }




    return (
        <>
            <Stack direction="column" justifyContent='space-between' alignItems='center' height={window.innerHeight - 64} >
                <Stack direction='row' justifyContent='space-between' sx={{ width: '100%' }}>
                    <Stack pl={7} pt={3} direction='row'>
                        <Avatar src={platformThumbnail} alt='platform avatar' sx={{
                            width: '30pt',
                            height: '30pt'
                        }} />
                        <Stack justifyContent='flex-start' ml={2} >
                            <Stack direction='row' sx={{ height: '30pt', justifyContent: 'center', alignItems: 'flex-start', mt: '5pt', }}>
                                <Typography variant='h5' sx={{ color: { color }, flexGrow: 1, fontSize: 16 }}> {(platformName + ':')}  </Typography>
                                <Typography variant='h5' sx={{ color: 'grey.600', ml: 1, fontSize: 16 }}> {title}  </Typography>
                            </Stack>
                            <Stack direction='row' >
                                <Avatar src={ownerAvatar} alt='platform avatar' sx={{
                                    width: 20,
                                    height: 20,
                                    mr: 1
                                }} />
                                <Typography sx={{ fontSize: 14, color: 'grey.600', fontWeight: 600, }}> {ownerUsername} </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Grid container item xs={3} direction='column' sx={{ color: { color }, position: 'relative', width: 350, height: 150, overflow: 'hidden' }}>
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
                {questionList && index < questionList.length ?
                    <Question
                        enter={enter}
                        setEnter={handleEnter}
                        index={index}
                        color={color}
                        questionId={questionList[index]}
                        handleNextQuestion={() => handleNextQuestion()}
                        handleAnswer={handleAnswer}
                        timerOn={handleTimerOn}
                        timerOff={handleTimerOff}
                    /> : <></>}

                <Stack sx={{
                    width: '100%',
                    color: { color },
                    mt: '10%'
                }}>
                    <LinearProgress variant="determinate" value={Math.round((timeProgress / timeLimit) * 100)} color='inherit' sx={{
                        height: 12,
                        [`& .MuiLinearProgress-bar`]: {
                            borderRadius: 2,
                        },
                    }} />
                </Stack>

            </Stack >
            <Dialog open={open}
                aria-labelledby="quiz-details-dialog"
                sx={{ backgroundColor: 'transparent' }}
                fullWidth={true}
                maxWidth='md'>

                <Stack >
                    <Stack direction='row' justifyContent='flex-start' p={3} pb={1} pt={5} >
                        <Avatar src={platformThumbnail} alt='platform avatar' sx={{
                            width: '30pt',
                            height: '30pt'
                        }} />
                        <Stack justifyContent='flex-start' ml={2} >
                            <Stack direction='row' sx={{ height: '30pt', justifyContent: 'center', alignItems: 'flex-start', mt: '5pt', }}>
                                <Typography variant='h5' sx={{ color: { color }, flexGrow: 1, fontSize: 16 }}> {(platformName + ':')}  </Typography>
                                <Typography variant='h5' sx={{ color: 'grey.600', ml: 1, fontSize: 16 }}> {title}  </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' sx={{ width: '80%' }}>
                        <Stack direction='row' ml={'60pt'}>
                            <Avatar src={ownerAvatar} alt='platform avatar' sx={{
                                width: 20,
                                height: 20,
                                mr: 1
                            }} />
                            <Typography sx={{ fontSize: 14, color: 'grey.600', fontWeight: 600, }}> {ownerUsername} </Typography>
                        </Stack>
                        <Stack direction='row'>
                            <Logo fill={color} style={{ height: 20, width: 20, marginRight: 10 }} />
                            <Typography sx={{ fontSize: 14, color: 'grey.600', fontWeight: 600, mr: 5 }}> {rating} </Typography>
                            <Visibility fill={color} style={{ height: 20, width: 20, marginRight: 10 }} />
                            <Typography sx={{ fontSize: 14, color: 'grey.600', fontWeight: 600, }}> {attempted} </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '80%', mt: 5 }}>
                        <Stack direction='row' ml={'60pt'} alignItems='center'>
                            <Typography sx={{ fontSize: 24, color: 'common.black', fontWeight: 700, }}> You earned</Typography>
                            <Typography sx={{ fontSize: 28, color: color, fontWeight: 700, ml: 5 }}>  {playPoints} </Typography>
                            <Bolt fill={color} sx={{ fontSize: 30, }} />
                        </Stack>

                        <Stack direction='column' justifyContent='center' >
                            {/* <Typography textAlign='center' sx={{ fontSize: 17, color: 'common.black', fontWeight: 700 }}> Your Streak </Typography> */}
                            <Avatar sx={{ height: 60, width: 60, mt: 2, background: color || 'grey', color: 'white', alignItems: 'center' }}>
                                <Typography fontSize={18} fontWeight={600}>
                                    {(playPoints / 10).toString() + ' / ' + (questionList ? questionList.length : 0).toString()}
                                </Typography>
                            </Avatar>
                        </Stack>
                    </Stack>

                    <Stack direction='row' justifyContent='space-between' alignItems='flex-end' sx={{ width: '90%', mt: 7, mb: 5 }}>
                        <Stack direction='column' ml={'50pt'} alignItems='center'>
                            <Typography sx={{ fontSize: 16, color: 'common.black', fontWeight: 600, }}> How good was the quiz? </Typography>
                            <Stack direction='row' mt={2}>
                                {(new Array(5).fill(0)).map((element, index) =>
                                    <ButtonBase onClick={() => {
                                        setUserRating(index + 1);
                                    }} sx={{
                                        p: 0.5,
                                        pl: 1,
                                        py: 1,
                                        borderRadius: '40%'
                                    }}>
                                        <Logo fill={index > userRating - 1 ? '#D1D1D1' : color} style={{ height: 25, width: 25, marginRight: 10 }} />
                                    </ButtonBase>
                                )}
                            </Stack>
                        </Stack>
                        <Button endIcon={<ArrowForward />}
                            disabled={userRating === 0}
                            onClick={handleFinishSubmit}
                            sx={{
                                color: color || 'common.black',
                                px: 2,
                                fontWeight: 700,
                                fontSize: 18,
                            }}>
                            FINISH
                        </Button>
                    </Stack>

                </Stack>


            </Dialog>
        </>);
}


function Question({ index, color, questionId, handleNextQuestion, timerOn, timerOff, enter, setEnter, handleAnswer }) {
    const [clicked, setClicked] = useState(-1);
    const { data: questionData } = useQuery(GET_QUESTION_INFO, { variables: { questionId: questionId } });

    let question;


    if (questionData) {
        question = questionData.getQuestionInfo;
    }

    useEffect(() => {
        console.log('question render');
    });


    useEffect(() => {
        console.log('what is rendering now?');
    }, [handleAnswer]);

    useEffect(() => {
        console.log('index changed');
        timerOn();
        setClicked(-1);
        return (() => {
            timerOff();
        });
    }, [index, timerOff, timerOn]);



    useEffect(() => {
        if (clicked >= 0) {
            console.log('clicked use effect');
            setEnter(false);
        };
    }, [clicked]);


    const handleClick = (index, correct) => {
        console.log('clicked');
        setClicked(index);
        handleAnswer(correct);
    }



    function Option({ option, index }) {
        var correct = option === question.correctAnswer;
        var feedbackColor = correct ? '#219653' : '#eb5757';
        var showFeedback = index === clicked;


        return (
            <Grid item xs={5} mr={2} >
                <ButtonBase
                    onClick={() => { handleClick(index, correct) }}
                    disableRipple
                    sx={{
                        minWidth: '70%',
                        minHeight: 50,
                        backgroundColor: showFeedback ? feedbackColor : 'grey.400',
                        borderRadius: '5pt',
                        "&:hover": {
                            backgroundColor: showFeedback ? feedbackColor : color,
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
                            backgroundColor: showFeedback ? '#ffffffd5' : 'grey.200',
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

        <Stack>
            <Slide in={enter} direction='right' appear={false} timeout={{ exit: 700 }}
                onExited={() => {
                    setEnter(true);
                    handleNextQuestion();
                }}>
                <Stack sx={{ width: '100%', mr: 10 }} >
                    <Stack alignItems='center' direction='row'>
                        <Avatar sx={{ backgroundColor: color, width: '60pt', height: '60pt', fontSize: 26, fontWeight: 600 }}> {index + 1}</Avatar>
                        <Typography sx={{ ml: '20pt', fontSize: 20, color: 'primary.black', fontWeight: 600 }}> {question?.description || null}</Typography>
                    </Stack>
                    <Grid container direction='row' ml='80pt' mt={1} rowSpacing={2} justifyContent='flex-start' columnGap={1}>
                        {question ? question.answerOptions.map((option, index) => <Option option={option} index={index} key={index} />) : null}
                    </Grid>
                </Stack >
            </Slide>
        </Stack>

    );
}

