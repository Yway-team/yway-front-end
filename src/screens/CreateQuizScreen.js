import React, {useEffect, useState} from "react";
import {Button, Grid, Stack} from "@mui/material";
import {ComfirmationDialog, CommonTitle} from "../components";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import {makeVar, useMutation} from "@apollo/client";
import {CREATE_AND_PUBLISH_QUIZ, SAVE_QUIZ_AS_DRAFT} from "../controllers/graphql/quiz-mutations";
import {v4 as uuidv4} from 'uuid';
import CreateQuestionCardList from "../components/CreateQuestionCardList";
import CreateQuizForms from "../components/CreateQuizForms";

export const questionsVar = makeVar([]);
export const quizDetailsVar = makeVar({
    platformName: '',
    title: '',
    description: '',
    timeToAnswer: 10,
    shuffleQuestions: false,
    shuffleAnswers: false
    // todo: color, tags, images
});

export default function CreateQuizScreen() {
    // NOTE: this screen gets quite slow when the number of questions is very high - try with 1000 questions and you'll see what I mean.
    // Can we improve performance (maybe by finding a way not to use the O(n) map and filter methods)?
    // const classes = useStyles();
    // todo: problem with the button that minimizes the left bar - it destroys the state of the main screen. Must be fixed.

    // This object should only be used when the question information is needed to submit or save the quiz; everything other use case belongs to the CreateQuestionCard component. We can't afford to re-render the whole screen on a single change.
    // todo: only allow quiz creation if the user does not have the maximum number of drafts
    // todo: fetch draft and set initial states accordingly
    // todo: tags, color, thumbnailImg, bannerImg
    const start = Date.now();
    const [createAndPublishQuiz] = useMutation(CREATE_AND_PUBLISH_QUIZ);
    const [saveQuizAsDraft] = useMutation(SAVE_QUIZ_AS_DRAFT);
    const [_, setQuestions] = useState(questionsVar());
    const [numQuestions, setNumQuestions] = useState(questionsVar().length);
    const [updateNumQuestions, setUpdateNumQuestions] = useState(false);
    const [publishConfirmOpen, setPublishConfirmOpen] = useState(false);

    const togglePublishConfirmOpen = () => {
        setPublishConfirmOpen(!publishConfirmOpen);
    }

    useEffect(() => console.log(`Rendered CreateQuizScreen in ${(Date.now() - start)} milliseconds.`));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const questions = questionsVar();
        const quizDetails = quizDetailsVar();
        questions.forEach(question => delete question.id);
        const quizObj = {
            questions: questions,
            title: quizDetails.title,
            shuffleQuestions: quizDetails.shuffleQuestions,
            shuffleAnswers: quizDetails.shuffleAnswers,
            description: quizDetails.description,
            platformName: quizDetails.platformName,
            timeToAnswer: quizDetails.timeToAnswer
            /* other optional props */
        };
        await createAndPublishQuiz({variables: {quiz: quizObj}});
    };

    const handleSaveAsDraft = async (e) => {
        e.preventDefault();
        const questions = questionsVar();
        const quizDetails = quizDetailsVar();
        questions.forEach(question => delete question.id);
        const draftObj = {
            questions: questions,
            title: quizDetails.title,
            shuffleQuestions: quizDetails.shuffleQuestions,
            shuffleAnswers: quizDetails.shuffleAnswers,
            description: quizDetails.description,
            platformName: quizDetails.platformName,
            timeToAnswer: quizDetails.timeToAnswer
            /* other optional props */
        };
        // if (draftId) {
        //     draftObj._id = draftId;
        // }
        await saveQuizAsDraft({variables: {draft: draftObj}});
    }

    const handleDeleteQuestion = async questionIndex => {
        let questions = questionsVar();
        questionsVar(questions.filter((_, i) => i !== questionIndex));
        setNumQuestions(numQuestions - 1);
        setUpdateNumQuestions(!updateNumQuestions);
        setQuestions([...questionsVar()]);
    }

    const handleUpdateNumQuestions = async newNumQuestions => {
        let questions = questionsVar();
        if (newNumQuestions > questions.length) {
            questionsVar([...questions, ...Array(newNumQuestions - questions.length).fill(null).map(() => {
                return {
                    id: uuidv4(),
                    description: '',
                    answerOptions: ['', ''],
                    correctAnswerIndex: -1
                }
            })]);
            setNumQuestions(newNumQuestions);
            setQuestions([...questionsVar()]);
        } else if (newNumQuestions < questions.length) {
            questionsVar(questions.filter((_, i) => i < newNumQuestions));
            setNumQuestions(newNumQuestions);
            setQuestions([...questionsVar()]);
        }
    }

    return (
        <>
            <Grid container direction="column" sx={{p: 2, pl: 10, width: 700}}>
                <Grid item>
                    <CommonTitle title='CREATE QUIZ'/>
                </Grid>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container item direction="column" sx={{py: 2}} spacing={2}>
                        <CreateQuizForms numQuestions={numQuestions} updateNumQuestions={updateNumQuestions}
                                         handleUpdateNumQuestions={handleUpdateNumQuestions}/>
                        <CreateQuestionCardList handleDeleteQuestion={handleDeleteQuestion}/>
                        <Button variant={"outlined"} endIcon={<AddCircleOutlinedIcon/>} sx={{alignSelf: "flex-start"}}
                                onClick={() => {
                                    let questions = questionsVar();
                                    questions.push({
                                        id: uuidv4(),
                                        description: '',
                                        answerOptions: ['', ''],
                                        correctAnswerIndex: -1
                                    });
                                    questionsVar(questions);
                                    setNumQuestions(numQuestions + 1);
                                    setQuestions([...questionsVar()]);
                                    setUpdateNumQuestions(!updateNumQuestions);
                                }} style={{marginLeft: 16, marginTop: 20}}>Add Question</Button>
                        <Stack direction={"row"} spacing={2} style={{marginLeft: 16, paddingTop: 40, width: 700}}
                               justifyContent='space-between'>
                            <Button variant={"outlined"} style={{marginRight: 150}}>DISCARD</Button>
                            <Stack direction='row' spacing={2}>
                                <Button variant={"contained"} onClick={handleSaveAsDraft}>SAVE AS DRAFT</Button>
                                <Button variant={"contained"} onClick={togglePublishConfirmOpen}
                                    // type={"submit"}
                                >PUBLISH</Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </form>
            </Grid>
            <ComfirmationDialog
                open={publishConfirmOpen}
                handleClose={togglePublishConfirmOpen}
                title='PUBLISH YOUR QUIZ'
                content='Are you sure you want to publish this quiz now?'
                yesText='PUBLISH NOW'
                yesCallback={() => {
                }}
                noText='CANCEL'
                noCallback={() => {
                }}
            />
        </>
    )
}
