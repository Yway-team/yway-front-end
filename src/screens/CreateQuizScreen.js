import React, {useState} from "react";
import {Button, Checkbox, FormControlLabel, FormLabel, Grid, Stack} from "@mui/material";
import {CommonTitle, CreateQuestionCard, LabelTextField} from "../components";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

export default function CreateQuizScreen() {
    // const classes = useStyles()
    const [platform, setPlatform] = useState('')
    const [quizTitle, setQuizTitle] = useState('')
    const [numQuestions, setNumQuestions] = useState(0)
    const [shuffleQuestions, setShuffleQuestions] = useState(false);
    const [shuffleAnswer, setShuffleAnswer] = useState(false);
    const [questions, setQuestions] = useState([]);

    const handleAddQuestion = () => {
        setQuestions(questions => [...questions, `${questions.length}`]);
        console.log(questions);
        setNumQuestions(numQuestions + 1);
    };

    const handleRemoveQuestion = (index) => {
        setQuestions(questions.filter((value, i) => i !== index));
        console.log(questions);
        setNumQuestions(numQuestions - 1);
    };

    const UpdateQuestion = index => e => {
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
                <Grid container item direction="column" sx={{p: 2}}>
                    <Grid item>
                        <FormLabel style={{
                            fontWeight: '700',
                            fontSize: 16,
                            color: 'common.black'
                        }}>
                            Quiz Details
                        </FormLabel>
                    </Grid>
                    <Grid item>
                        <LabelTextField label={"Platform"} onChange={(e) => setPlatform(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <LabelTextField label={"Quiz Title"} onChange={(e) => setQuizTitle(e.target.value)}/>
                    </Grid>
                    <Grid item marginTop={4}>
                        <FormLabel style={{
                            fontWeight: '700',
                            fontSize: 16,
                            color: 'common.black'
                        }}>
                            Questions
                        </FormLabel>
                    </Grid>
                    <Grid item>
                        <LabelTextField label={"Number of Questions"}
                                        value={numQuestions || ''}
                                        type={"number"}/>
                    </Grid>
                    <Grid item>
                        <FormControlLabel label="Shuffle Questions" labelPlacement="start"
                                          value={"shuffle questions"}
                                          control={<Checkbox onChange={(e) => setShuffleQuestions(e.target.checked)}/>}>
                        </FormControlLabel>
                    </Grid>
                    <Grid item>
                        <FormControlLabel label="Shuffle Answer Options" labelPlacement="start"
                                          value={"shuffle answer"}
                                          control={<Checkbox onChange={(e) => setShuffleAnswer(e.target.checked)}/>}>
                        </FormControlLabel>
                    </Grid>
                    <Grid container item direction={"column"}>
                        {questions.map((data, index) => <CreateQuestionCard key={data._id} questionIndex={index}
                                                                            handleRemoveQuestion={() => handleRemoveQuestion(index)} {...data} />)}
                    </Grid>
                    <Button variant={"outlined"} endIcon={<AddCircleOutlinedIcon/>} sx={{alignSelf: "flex-start"}}
                            onClick={handleAddQuestion}> Add
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

