import React, {useRef, useState} from "react";
import {Button, Checkbox, FormControlLabel, FormLabel, Grid, Stack} from "@mui/material";
import {CP, CommonTitle, CreateQuestionCard, LabelTextField} from "../components";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import {useMutation} from "@apollo/client";
import {CREATE_AND_PUBLISH_QUIZ} from "../controllers/graphql/quiz-mutations";

export default function CreateQuizScreen() {
    // NOTE: this screen gets quite slow when the number of questions is very high - try with 1000 questions and you'll see what I mean.
    // Can we improve performance (maybe by finding a way not to use the O(n) map and filter methods)?
    // const classes = useStyles();
    // todo: problem with the button that minimizes the left bar - it destroys the state of the main screen. Must be fixed.

    // This object should only be used when the question information is needed to submit or save the quiz; everything other use case belongs to the CreateQuestionCard component. We can't afford to re-render the whole screen on a single change.
    const [createAndPublishQuiz] = useMutation(CREATE_AND_PUBLISH_QUIZ);
    const refContainer = useRef([]);
    const [shouldChildUpdate, setShouldChildUpdate] = useState(false);
    // refContainer.current = [{description, answerOptions, correctAnswer}]
    const [platform, setPlatform] = useState('');
    const [quizTitle, setQuizTitle] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [numQuestions, setNumQuestions] = useState(0);
    const [textFieldNumQuestions, setTextFieldNumQuestions] = useState(0);
    const [timeToAnswer, setTimeToAnswer] = useState('10');
    const [shuffleQuestions, setShuffleQuestions] = useState(false);
    const [shuffleAnswer, setShuffleAnswer] = useState(false);
    const MAX_QUESTIONS = 100;

    const decrementNumQuestions = () => {
        setNumQuestions(numQuestions - 1);
        setTextFieldNumQuestions(textFieldNumQuestions - 1);
        setShouldChildUpdate(!shouldChildUpdate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const quizObj = {
            questions: refContainer.current,
            title: quizTitle,
            shuffleQuestions: shuffleQuestions,
            shuffleAnswers: shuffleAnswer,
            description: quizDescription /* todo */,
            platformName: platform,
            timeToAnswer: timeToAnswer
            /* other optional props */
        };
        await createAndPublishQuiz({variables: {quiz: quizObj}});
    };

    return (
        <Grid container direction="column" sx={{p: 2, pl: 10}}>
            <Grid item>
                <CommonTitle title='CREATE QUIZ'/>
            </Grid>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container item direction="column" sx={{p: 2}} spacing={2}>
                    <Grid item>
                        <FormLabel style={{fontWeight: '700', fontSize: 16, color: 'common.black'}}>
                            Quiz Details
                        </FormLabel>
                    </Grid>
                    <Grid item>
                        <LabelTextField label={"Platform"} value={platform}
                                        onChange={(e) => setPlatform(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <LabelTextField label={"Quiz Title"} value={quizTitle}
                                        onChange={(e) => setQuizTitle(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <LabelTextField name="description" label={"Description"} value={quizDescription}
                                        onChange={e => setQuizDescription(e.target.value)} multiline={true}
                                        variant={"outlined"}/>
                    </Grid>
                    <Grid item marginTop={4}>
                        <FormLabel style={{
                            fontWeight: '700', fontSize: 16, color: 'common.black'
                        }}>
                            Questions
                        </FormLabel>
                    </Grid>
                    <Grid item>
                        <LabelTextField label={"Number of Questions"}
                                        onChange={e => e.target.value >= 0 && e.target.value <= MAX_QUESTIONS ? setTextFieldNumQuestions(Number(e.target.value)) : null /* todo: give a warning when they decrease the value */}
                                        value={textFieldNumQuestions || ''}
                                        onBlur={e => setNumQuestions(textFieldNumQuestions)}
                                        type={"number"}/>
                    </Grid>
                    <Grid item>
                        <LabelTextField name="timeToAnswer" label={"Time to answer (seconds)"} type={"number"}
                                        placeholder={timeToAnswer}
                                        onChange={(e) => setTimeToAnswer(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <FormControlLabel label="Shuffle Questions" labelPlacement="start"
                                          style={{marginLeft: 0, width: 280, justifyContent: "space-between"}}
                                          control={<Checkbox onChange={(e) => setShuffleQuestions(e.target.checked)}/>}>
                        </FormControlLabel>
                    </Grid>
                    <Grid item>
                        <FormControlLabel label="Shuffle Answer Options" labelPlacement="start"
                                          style={{marginLeft: 0, width: 280, justifyContent: "space-between"}}
                                          control={<Checkbox onChange={(e) => setShuffleAnswer(e.target.checked)}/>}>
                        </FormControlLabel>
                    </Grid>
                    <Grid container item direction={"column"} marginLeft={-2}>
                        {Array(numQuestions).fill(null).map((_, index) => <CreateQuestionCard
                            questions={refContainer.current} key={index} questionIndex={index}
                            decrementNumQuestions={decrementNumQuestions} shouldChildUpdate={shouldChildUpdate}
                        />)}
                    </Grid>
                    <Button variant={"outlined"} endIcon={<AddCircleOutlinedIcon/>} sx={{alignSelf: "flex-start"}}
                            onClick={() => {
                                setNumQuestions(numQuestions + 1);
                                setTextFieldNumQuestions(textFieldNumQuestions + 1);
                            }} style={{marginLeft: 16, marginTop: 20}}>Add Question</Button>
                    <Stack direction={"row"} spacing={2} style={{marginLeft: 16, paddingTop: 40}}>
                        <Button variant={"outlined"} style={{marginRight: 150}}>DISCARD</Button>
                        <Button variant={"contained"}>SAVE</Button>
                        <Button variant={"contained"} type={"submit"}>PUBLISH</Button>
                    </Stack>
                </Grid>
            </form>
        </Grid>
    )
}
