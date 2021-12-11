import React, {Fragment, useEffect, useState} from "react";
import {Button, Grid, Stack, Typography} from "@mui/material";
import {CommonTitle, ConfirmationDialog} from "../components";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import {makeVar, useLazyQuery, useMutation, useReactiveVar} from "@apollo/client";
import {
    CREATE_AND_PUBLISH_QUIZ,
    SAVE_QUIZ_AS_DRAFT,
    UPDATE_PUBLISHED_QUIZ
} from "../controllers/graphql/quiz-mutations";
import {v4 as uuidv4} from 'uuid';
import CreateQuestionCardList from "../components/CreateQuizScreen/CreateQuestionCardList";
import CreateQuizForms from "../components/CreateQuizScreen/CreateQuizForms";
import {useHistory, useParams} from 'react-router-dom';
import {globalState, loggedInChanged} from "../state/UserState";
import {GET_QUIZ_EDIT_INFO} from "../controllers/graphql/quiz-queries";
import {GET_DRAFT} from "../controllers/graphql/user-queries";


export const questionsVar = makeVar([]);
export const quizDetailsVar = makeVar({
    platformName: '',
    title: '',
    description: '',
    timeToAnswer: 10,
    shuffleQuestions: false,
    shuffleAnswers: false,
    bannerImgData: null,
    thumbnailImgData: null,
    color: '#ff5a1d',
    tags: []
    // todo: color, tags, images
});

export const formErrorsVar = makeVar({
    platformValid: true,
    titleValid: true,
    numQuestionsValid: true,
    timeToAnswerValid: true,
    errorMsgs: {platform: '', title: '', numQuestions: '', timeToAnswer: ''}
});

export default function CreateQuizScreen({draft, edit}) {
    // NOTE: this screen gets quite slow when the number of questions is very high - try with 1000 questions and you'll see what I mean.
    // Can we improve performance (maybe by finding a way not to use the O(n) map and filter methods)?
    // const classes = useStyles();
    // todo: problem with the button that minimizes the left bar - it destroys the state of the main screen. Must be fixed.

    // This object should only be used when the question information is needed to submit or save the quiz; everything other use case belongs to the CreateQuestionCard component. We can't afford to re-render the whole screen on a single change.
    // todo: only allow quiz creation if the user does not have the maximum number of drafts
    // todo: fetch draft and set initial states accordingly
    // todo: tags, color, thumbnailImg, bannerImg

    const start = Date.now();
    const history = useHistory();
    const shouldUpdate = useReactiveVar(loggedInChanged)
    const [errorQuestions, setErrorQuestions] = useState([]);
    const [formError, setFormError] = useState(false);
    const [createAndPublishQuiz] = useMutation(CREATE_AND_PUBLISH_QUIZ);
    const [saveQuizAsDraft] = useMutation(SAVE_QUIZ_AS_DRAFT);
    const [updatePublishedQuiz] = useMutation(UPDATE_PUBLISHED_QUIZ);
    const [getQuizEditInfo, {data, refetch, loading}] = useLazyQuery(GET_QUIZ_EDIT_INFO);
    const [getDraft] = useLazyQuery(GET_DRAFT);
    const [_, setQuestions] = useState(questionsVar());
    const [numQuestions, setNumQuestions] = useState(questionsVar().length);
    const [updateNumQuestions, setUpdateNumQuestions] = useState(false);
    const [publishConfirmOpen, setPublishConfirmOpen] = useState(false);
    const params = useParams();
    const [gotQuizInfo, setGotQuizInfo] = useState(false);
    let quizInfo;

    if (draft && !gotQuizInfo) {
        const {draftId} = params;
        getDraft({variables: {draftId: draftId}}).then(({data}) => {
            quizInfo = data.getDraft;
            console.log(quizInfo);
            let quizDetails = quizDetailsVar();
            let details = {...quizDetails};
            details.platformName = quizInfo.platformName;
            details.title = quizInfo.title;
            details.description = quizInfo.description;
            details.tags = quizInfo.tags ? quizInfo.tags : [];
            details.bannerImg = quizInfo.bannerImg;
            details.thumbnailImg = quizInfo.thumbnailImg;
            details.timeToAnswer = quizInfo.timeToAnswer;
            details.shuffleAnswers = quizInfo.shuffleAnswers;
            details.shuffleQuestions = quizInfo.shuffleQuestions;
            details.color = quizInfo.color;
            details._id = draftId;
            quizDetailsVar(details);
            // Deep copy of uiParent
            const uiParentCleaned = JSON.parse(JSON.stringify(quizInfo.questions));
            // Strip __typename from uiParent and item list
            delete uiParentCleaned.__typename;
            uiParentCleaned.forEach(element => delete element.__typename);
            questionsVar(uiParentCleaned);
            setQuestions([...questionsVar()]);
            setNumQuestions(questionsVar().length);
        });
        setGotQuizInfo(true);
    }

    if (edit && (shouldUpdate || !gotQuizInfo) && data?.getQuizEditInfo) {
        quizInfo = data.getQuizEditInfo;
        // quizInfo = data.getQuizEditInfo;
        let quizDetails = quizDetailsVar();
        let details = {...quizDetails};
        // details.platformName = quizInfo.platformName;
        details.title = quizInfo.title;
        details.description = quizInfo.description;
        details.tags = quizInfo.tags ? quizInfo.tags : [];
        details.bannerImg = quizInfo.bannerImg;
        details.thumbnailImg = quizInfo.thumbnailImg;
        // details.timeToAnswer = quizInfo.timeToAnswer;
        // details.shuffleAnswers = quizInfo.shuffleAnswers;
        // details.shuffleQuestions = quizInfo.shuffleQuestions;
        details.color = quizInfo.color;
        quizDetailsVar(details);
        loggedInChanged(false);
        setGotQuizInfo(true);
    } else if (!gotQuizInfo && data) {
        setGotQuizInfo(true);
    }

    if (edit && ((shouldUpdate && !loading) || (!gotQuizInfo && !loading))) {
        const {quizId} = params;
        if (!gotQuizInfo) console.log('getQuizEditInfo...');
        else console.log('refetch...');
        if (!gotQuizInfo) getQuizEditInfo({variables: {quizId: quizId}});
        else refetch();
    }


    const togglePublishConfirmOpen = () => {
        setPublishConfirmOpen(!publishConfirmOpen);
    };

    useEffect(() => console.log(`Rendered CreateQuizScreen in ${(Date.now() - start)} milliseconds.`));

    // useEffect(() => {
    //     // see usage here https://opentdb.com/api_config.php
    //     fetch("https://opentdb.com/api_token.php?command=request")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 const token = result.token;
    //                 console.log('token', result.token)
    //                 const api = "https://opentdb.com/api.php?amount=10".concat('&token=').concat(token);
    //                 console.log(api);
    //                 fetch(api)
    //                     .then(res => res.json())
    //                     .then(
    //                         (result) => {
    //                             console.log('here', result)
    //                             console.log('results', result.results)
    //                             result.results.forEach(question => {
    //                                 console.log(question);
    //                                 let questions = questionsVar();
    //                                 let answers = [];
    //                                 question.incorrect_answers.forEach(option => answers.push(decodeHtml(option)));
    //                                 answers.push(decodeHtml(question.correct_answer));
    //                                 console.log(answers);
    //                                 questions.push({
    //                                     id: uuidv4(),
    //                                     description: decodeHtml(question.question),
    //                                     answerOptions: answers,
    //                                     correctAnswerIndex: answers.length - 1
    //                                 });
    //                                 questionsVar(questions);
    //                                 setNumQuestions(numQuestions + 1);
    //                                 setQuestions([...questionsVar()]);
    //                                 setUpdateNumQuestions(!updateNumQuestions);
    //                             })
    //                         },
    //                     )
    //             },
    //         )
    //
    // }, []);

    useEffect(() => {
        let quizDetails = quizDetailsVar();
        let details = {...quizDetails};
        details.platformName = '';
        details.title = '';
        details.description = '';
        details.tags = [];
        details.bannerImgData = null;
        details.thumbnailImgData = null;
        details.timeToAnswer = 10;
        details.shuffleAnswers = false;
        details.shuffleQuestions = false;
        details.color = '#ff5a1d';
        quizDetailsVar(details);

        questionsVar([]);
        setNumQuestions(0);

        let formErrors = {
            platformValid: true,
            titleValid: true,
            numQuestionsValid: true,
            timeToAnswerValid: true,
            errorMsgs: {platform: '', title: '', numQuestions: '', timeToAnswer: ''}
        };
        formErrorsVar(formErrors);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const questions = questionsVar();
        const quizDetails = quizDetailsVar();
        questions.forEach(question => delete question.id);
        console.log(quizDetails);
        const {draftId} = params;
        const quizObj = {
            _id: draftId,
            questions: questions,
            title: quizDetails.title,
            shuffleQuestions: quizDetails.shuffleQuestions,
            shuffleAnswers: quizDetails.shuffleAnswers,
            description: quizDetails.description,
            platformName: quizDetails.platformName,
            timeToAnswer: quizDetails.timeToAnswer,
            bannerImgData: quizDetails.bannerImgData,
            bannerImgName: quizDetails.bannerImgName,
            thumbnailImgData: quizDetails.thumbnailImgData,
            thumbnailImgName: quizDetails.thumbnailImgName,
            color: quizDetails.color,
            tags: quizDetails.tags
            /* other optional props */
        };
        await createAndPublishQuiz({variables: {quiz: quizObj}});
        history.push(`/user/${globalState()._id}/quizzes`);
    };

    const handleSaveAsDraft = async (e) => {
        e.preventDefault();
        const questions = questionsVar();
        const quizDetails = quizDetailsVar();
        questions.forEach(question => delete question.id);
        const draftObj = {
            _id: quizDetails._id,
            questions: questions,
            title: quizDetails.title,
            shuffleQuestions: quizDetails.shuffleQuestions,
            shuffleAnswers: quizDetails.shuffleAnswers,
            description: quizDetails.description,
            platformName: quizDetails.platformName,
            timeToAnswer: quizDetails.timeToAnswer,
            bannerImgData: quizDetails.bannerImgData,
            bannerImgName: quizDetails.bannerImgName,
            thumbnailImgData: quizDetails.thumbnailImgData,
            thumbnailImgName: quizDetails.thumbnailImgName,
            color: quizDetails.color,
            tags: quizDetails.tags,
            updatedAt: new Date()
            /* other optional props */
        };
        // if (draftId) {
        //     draftObj._id = draftId;
        // }
        await saveQuizAsDraft({variables: {draft: draftObj}});
        history.push('/drafts');
    }

    const handleSaveChanges = async e => {
        e.preventDefault();
        const quizDetails = quizDetailsVar();
        console.log(quizDetails);
        const {quizId} = params;
        await updatePublishedQuiz({
            variables: {
                quizDetails: {
                    _id: quizId,
                    bannerImg: quizDetails.bannerImg,
                    bannerImgData: quizDetails.bannerImgData,
                    color: quizDetails.color,
                    description: quizDetails.description,
                    tags: quizDetails.tags,
                    thumbnailImg: quizDetails.thumbnailImg,
                    thumbnailImgData: quizDetails.thumbnailImgData,
                    title: quizDetails.title
                }
            }
        });
        history.push(`/user/${globalState()._id}/quizzes`);
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
                    correctAnswerIndex: 0
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

    function validateCreateQuiz() {
        let notValid = false;
        let details = quizDetailsVar();
        let errors = {...formErrorsVar()};
        let questions = questionsVar();
        console.log(details.platformName)
        console.log(typeof details.platformName)

        if (typeof details.platformName === undefined) {
            if (errors.platformValid === true) {
                errors.platformValid = false;
                errors.errorMsgs.platform = "Platform cannot be empty.";
            }
            notValid = true;
        } else if (errors.titleValid === false) {
            errors.platformValid = true;
            errors.errorMsgs.platform = "";
        }
        if (details.title.length === 0) {
            if (errors.titleValid === true) {
                errors.titleValid = false;
                errors.errorMsgs.title = "Title cannot be empty.";
            }
            notValid = true;
        } else if (errors.titleValid === false) {
            errors.titleValid = true;
            errors.errorMsgs.title = "";
        }
        if (numQuestions === 0) {
            if (errors.numQuestionsValid === true) {
                errors.numQuestionsValid = false;
                errors.errorMsgs.numQuestions = "Must have at least 1 question.";

            }
            notValid = true;
        } else if (errors.numQuestionsValid === false) {
            errors.numQuestionsValid = true;
            errors.errorMsgs.numQuestions = "";
        }
        if (details.timeToAnswer > 3600) {
            if (errors.timeToAnswerValid === true) {
                errors.timeToAnswerValid = false;
                errors.errorMsgs.timeToAnswer = "Must be less than 3600 (1 hour).";

            }
            notValid = true;
        } else if (errors.timeToAnswerValid === false) {
            errors.timeToAnswerValid = true;
            errors.errorMsgs.timeToAnswer = "";
        }
        let errorqs = [];
        questions.forEach((question, index) => {
                if (question.description.length === 0 || question.answerOptions.length < 2) {
                    errorqs.push(index + 1);
                    notValid = true;
                }
                question.answerOptions.forEach(answer => {
                    if (answer.length === 0 && !errorqs.includes(index + 1)) {
                        errorqs.push(index + 1);
                        notValid = true;
                    }
                })
            }
        )
        formErrorsVar(errors);
        setErrorQuestions(errorqs);
        setFormError(notValid);
        return !notValid;
    }

    function validateEditQuiz() {
        let notValid = false;
        let details = quizDetailsVar();
        let errors = {...formErrorsVar()};
        if (details.title.length === 0) {
            if (errors.titleValid === true) {
                errors.titleValid = false;
                errors.errorMsgs.title = "Title cannot be empty.";
            }
            notValid = true;
        } else if (errors.titleValid === false) {
            errors.titleValid = true;
            errors.errorMsgs.title = "";
        }
        formErrorsVar(errors);
        setFormError(notValid);
        return !notValid;
    }

    function decodeHtml(html) {
        let txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    return (
        <>
            <Grid container direction="column" sx={{p: 2, pl: 10, width: 700}}>
                <Grid item>
                    <CommonTitle title={edit ? 'EDIT QUIZ' : 'CREATE QUIZ'}/>
                </Grid>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container item direction="column" sx={{py: 2}} spacing={2}>
                        <CreateQuizForms numQuestions={numQuestions} updateNumQuestions={updateNumQuestions}
                                         handleUpdateNumQuestions={handleUpdateNumQuestions} edit={edit}/>
                        {!edit ? <><CreateQuestionCardList handleDeleteQuestion={handleDeleteQuestion}/>
                            <Button variant={"outlined"} endIcon={<AddCircleOutlinedIcon/>}
                                    sx={{alignSelf: "flex-start"}}
                                    onClick={() => {
                                        let questions = questionsVar();
                                        questions.push({
                                            id: uuidv4(),
                                            description: '',
                                            answerOptions: ['', ''],
                                            correctAnswerIndex: 0
                                        });
                                        questionsVar(questions);
                                        setNumQuestions(numQuestions + 1);
                                        setQuestions([...questionsVar()]);
                                        setUpdateNumQuestions(!updateNumQuestions);
                                    }} style={{marginLeft: 16, marginTop: 20}}>Add Question</Button></> : <Fragment/>}
                        {errorQuestions.length > 0 ? <Grid item>
                            <Typography sx={{fontWeight: 'bold'}} style={{color: 'red'}}>Missing info in
                                question(s): {errorQuestions.toString()}. Question and answer options cannot be
                                empty. Each question must have at least 2 answer options.</Typography>
                        </Grid> : null}
                        <Stack direction={"row"} spacing={2} style={{marginLeft: 16, paddingTop: 40, width: 700}}
                               justifyContent='space-between'>
                            {edit ? <> <Stack direction='row' spacing={2}>
                                <Button variant={"contained"} onClick={() => {
                                    const valid = validateEditQuiz();
                                    if (valid) togglePublishConfirmOpen()
                                }}>SAVE CHANGES</Button>
                                <Button variant={"contained"} onClick={e => {
                                    history.push(`/user/${globalState()._id}/quizzes`);
                                }
                                }>CANCEL</Button></Stack></> : <><Button
                                variant={"outlined"} style={{marginRight: 150}} onClick={e => {
                                history.push("/drafts");
                            }}>{draft ? "CANCEL" : "DISCARD"}</Button>
                                <Stack direction='row' spacing={2}>
                                    <Button variant={"contained"} onClick={handleSaveAsDraft}>SAVE AS DRAFT</Button>
                                    <Button variant={"contained"} onClick={() => {
                                        const valid = validateCreateQuiz();
                                        if (valid) togglePublishConfirmOpen();
                                    }}>PUBLISH</Button>
                                </Stack></>}
                        </Stack>
                    </Grid>
                </form>
            </Grid>
            <ConfirmationDialog
                open={publishConfirmOpen}
                handleClose={togglePublishConfirmOpen}
                title={edit ? 'UPDATE YOUR QUIZ' : 'PUBLISH YOUR QUIZ'}
                content={edit ? 'Would you like to save your changes to this published quiz?' : `Are you sure you want to publish this quiz to the platform "${quizDetailsVar().platformName}"? Once you publish this quiz, its questions can't be edited.`}
                yesText={edit ? 'SAVE' : 'PUBLISH'}
                yesCallback={edit ? handleSaveChanges : handleSubmit}
                noText='CANCEL'
                noCallback={togglePublishConfirmOpen}
            />
        </>
    )
}
