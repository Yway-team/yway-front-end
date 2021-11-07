import React, {useState} from "react";
import {Button, Checkbox, FormControlLabel, FormLabel, Grid, Stack} from "@mui/material";
import {CommonTitle, CreateQuestionCard, LabelTextField} from "../components";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

export default function CreateQuizScreen() {
    // NOTE: this screen gets quite slow when the number of questions is very high - try with 1000 questions and you'll see what I mean.
    // Can we improve performance (maybe by finding a way not to use the O(n) map and filter methods)?
    // const classes = useStyles();
    const [platform, setPlatform] = useState('');
    const [quizTitle, setQuizTitle] = useState('');
    const [numQuestions, setNumQuestions] = useState(0);
    const [shuffleQuestions, setShuffleQuestions] = useState(false);
    const [shuffleAnswer, setShuffleAnswer] = useState(false);
    const [questions, setQuestions] = useState([]);
    const MAX_QUESTIONS = 1000

    const handleAddQuestion = () => {
        setQuestions(questions => [...questions, `${questions.length}`]);
        console.log(questions);
        setNumQuestions(numQuestions + 1);
    };

    const handleRemoveQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
        console.log(questions);
        setNumQuestions(numQuestions - 1);
    };

    const addOrRemoveQuestions = (howMany) => {
        // if howMany is negative, remove that many questions
        // don't change numQuestions in here - this reacts to a change in numQuestions
        console.log(`Add ${howMany} questions`);
        if (howMany === 0) {
            return null;
        }
        if (howMany < 0) {
            setQuestions(questions.filter((_, i) => i < questions.length + howMany));
        } else {
            const newQuestions = Array(howMany).fill(questions.length).map((value, i) => value + i);
            setQuestions([...questions, ...newQuestions]);
        }
    };

    const updateQuestion = index => e => {
        let newArr = [...questions];
        newArr[index] = e.target.value;
        setQuestions(newArr);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(platform, quizTitle, numQuestions, shuffleQuestions, shuffleAnswer, questions)
    }

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
                                        onChange={(e) => e.target.value >= 0 && e.target.value <= MAX_QUESTIONS ? setNumQuestions(Number(e.target.value)) : null /* todo: give a warning when they decrease the value */}
                                        value={numQuestions || ''}
                                        onBlur={() => addOrRemoveQuestions(numQuestions - questions.length)}
                                        type={"number"}/>
                    </Grid>
                    <Grid item>
                        <LabelTextField name="timeToAnswer" label={"Time to answer (seconds)"} type={"number"}/>
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
                    <Grid container item direction={"column"} marginLeft={-2}> {questions.map((data, index) =>
                        <CreateQuestionCard key={data._id} questionIndex={index}
                                            handleRemoveQuestion={() => handleRemoveQuestion(index)} {...data} />)}
                    </Grid>
                    <Button variant={"outlined"} endIcon={<AddCircleOutlinedIcon/>}
                            style={{marginLeft: 16, marginTop: 20}} sx={{alignSelf: "flex-start"}}
                            onClick={handleAddQuestion}> Add Question</Button>
                    <Stack direction={"row"} spacing={2} style={{marginLeft: 16, paddingTop: 40}}>
                        <Button variant={"outlined"} style={{marginRight: 150}}>DISCARD</Button>
                        <Button variant={"contained"} type={"submit"}>SAVE</Button>
                        <Button variant={"contained"}>PUBLISH</Button>
                    </Stack>
                </Grid>
            </form>
        </Grid>
    )
}

