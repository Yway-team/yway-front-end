import React, { useState, useRef } from "react";
import {Button, Checkbox, FormControlLabel, FormLabel, Grid, Stack} from "@mui/material";
import {CommonTitle, CreateQuestionCard, LabelTextField} from "../components";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

export default function CreateQuizScreen() {
    // NOTE: this screen gets quite slow when the number of questions is very high - try with 1000 questions and you'll see what I mean.
    // Can we improve performance (maybe by finding a way not to use the O(n) map and filter methods)?
    // const classes = useStyles();
    // todo: problem with the button that minimizes the left bar - it destroys the state of the main screen. Must be fixed.
    
    // This object should only be used when the question information is needed to submit or save the quiz; everything other use case belongs to the CreateQuestionCard component. We can't afford to re-render the whole screen on a single change.
    const refContainer = useRef([]);
    const [shouldChildUpdate, setShouldChildUpdate] = useState(false);
    // refContainer.current = [{description, answerOptions, correctAnswer}]
    const [platform, setPlatform] = useState('');
    const [quizTitle, setQuizTitle] = useState('');
    const [numQuestions, setNumQuestions] = useState(0);
    const [textFieldNumQuestions, setTextFieldNumQuestions] = useState(0);
    const [shuffleQuestions, setShuffleQuestions] = useState(false);
    const [shuffleAnswer, setShuffleAnswer] = useState(false);
    const [questions, setQuestions] = useState([]);
    const MAX_QUESTIONS = 100;

    const decrementNumQuestions = () => {
        setNumQuestions(numQuestions - 1);
        setShouldChildUpdate(!shouldChildUpdate);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(platform, quizTitle, numQuestions, shuffleQuestions, shuffleAnswer, questions)
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
                        <LabelTextField label={"Platform"} onChange={(e) => setPlatform(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <LabelTextField label={"Quiz Title"} onChange={(e) => setQuizTitle(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <LabelTextField name="description" label={"Description"} multiline={"multiline"} variant={"outlined"}/>
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
                                        type={"number"} />
                    </Grid>
                    <Grid item>
                        <FormControlLabel label="Shuffle Questions" labelPlacement="start" value={"shuffle questions"}
                                          style={{marginLeft: 0, width: 280, justifyContent: "space-between"}}
                                          control={<Checkbox onChange={(e) => setShuffleQuestions(e.target.checked)}/>}>
                        </FormControlLabel>
                    </Grid>
                    <Grid item>
                        <FormControlLabel label="Shuffle Answer Options" labelPlacement="start" value={"shuffle answer"}
                                          style={{marginLeft: 0, width: 280, justifyContent: "space-between"}}
                                          control={<Checkbox onChange={(e) => setShuffleAnswer(e.target.checked)}/>}>
                        </FormControlLabel>
                    </Grid>
                    <Grid container item direction={"column"}>
                        {Array(numQuestions).fill(null).map((_, index) => <CreateQuestionCard questions={refContainer.current} key={index} questionIndex={index}
                                                                                              decrementNumQuestions={decrementNumQuestions} shouldChildUpdate={shouldChildUpdate}
                                                                                            />)}
                    </Grid>
                    <Button variant={"outlined"} endIcon={<AddCircleOutlinedIcon/>} sx={{alignSelf: "flex-start"}}
                            onClick={() => setNumQuestions(numQuestions + 1)}> Add
                        Question</Button>
                    <Stack direction={"row"} spacing={2} style={{paddingTop: '20px'}}>
                        <Button variant={"outlined"}>DISCARD</Button>
                        <Button variant={"contained"} type={"submit"}>SAVE</Button>
                        <Button variant={"contained"}>PUBLISH</Button>
                    </Stack>
                </Grid>
            </form>
        </Grid>
    )
}
