import {
    Button,
    Card,
    CardContent,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";

// index: Int
// answerOptions: [String]
// correctAnswerIndex: Number
// question: String


export default function CreateQuestionCard(props) {
    // All state for the CreateQuestionCard must be handled here. Doing it in CreateQuizScreen is just too slow.
    const { questions, questionIndex, decrementNumQuestions, shouldChildUpdate } = props;
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const question = questions[questionIndex];
    const [description, setDescription] = useState(question?.description || '');
    const [answerOptions, setAnswerOptions] = useState(question?.answerOptions || ['', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(question?.correctAnswerIndex || -1);
    if (question && shouldUpdate !== shouldChildUpdate) {
        setDescription(question.description);
        setAnswerOptions(question.answerOptions);
        setCorrectAnswerIndex(question.correctAnswerIndex);
        setShouldUpdate(!shouldUpdate);
    }
    useEffect(() => {
        questions[questionIndex] = {
            description: description,
            answerOptions: answerOptions,
            correctAnswerIndex: correctAnswerIndex
        };
    });
    const theme = useTheme();

    const handleRemoveQuestion = () => {
        // PROBLEM: deletion duplicates the element after the deleted element.
        questions.splice(questionIndex, 1);
        decrementNumQuestions();
    }

    const duplicateQuestion = () => {
        // todo:
    }

    return (
        <Card variant="outlined" sx={{ maxWidth: 700, my: 2, borderColor: theme.palette.primary.main, borderRadius: 2, pr: 0 }}>
            <Grid container justifyContent="space-between">
                <Grid item container direction="row" sx={{
                    backgroundColor: theme.palette.primary.main,
                    height: "60px",
                    width: "60px",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: "0px 0px 55px 0px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)"
                }}>
                    <Grid container item xs={12} direction="row" alignItems="center" justifyContent="center">
                        <Typography sx={{ fontWeight: "700", fontSize: 20, color: theme.palette.common.white }}>
                            {questionIndex + 1}
                        </Typography>
                    </Grid>
                </Grid>
                <IconButton aria-label="delete question" sx={{ color: theme.palette.primary.main }}
                    onClick={handleRemoveQuestion}>
                    <CloseIcon />
                </IconButton>
            </Grid>
            <CardContent>
                <Grid padding={2} spacing={2} rowSpacing={3}>
                    <TextField label="Question" variant="standard" fullWidth multiline
                        value={description} onChange={e => setDescription(e.target.value)}
                        sx={{ mb: 2 }} />
                    {answerOptions.map((option, index) =>
                        <Stack direction={'row'} justifyItems={"baseline"}>
                            <TextField key={index} value={option} label={`Option ${index + 1}`} multiline
                                variant="standard"
                                onChange={e => setAnswerOptions(answerOptions.map((answerOption, answerIndex) => answerIndex === index ? e.target.value : answerOption))}
                                fullWidth
                                sx={{ mb: 2 }} />
                            <FormControlLabel label="Correct"
                                value={index}
                                control={<Radio
                                    checked={correctAnswerIndex === index}
                                    name={"correct"}
                                    value={correctAnswerIndex}
                                    onChange={e => e.target.checked ? setCorrectAnswerIndex(index) : null} />}>
                            </FormControlLabel>
                            <IconButton aria-label="delete option" sx={{ color: theme.palette.primary.main }}
                                onClick={() => {
                                    setAnswerOptions(answerOptions.filter((_, answerIndex) => answerIndex !== index));
                                    if (index === correctAnswerIndex) {
                                        setCorrectAnswerIndex(-1);
                                    } else if (index < correctAnswerIndex) {
                                        setCorrectAnswerIndex(correctAnswerIndex - 1);
                                    }
                                }}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    )}
                    <Stack direction="row" justifyContent="space-between" sx={{ paddingTop: 4 }}>
                        <Button variant={"outlined"} endIcon={<AddCircleOutlinedIcon />}
                            onClick={() => setAnswerOptions([...answerOptions, ''])}> Add
                            Option</Button>
                        <IconButton aria-label="duplicate question" sx={{ color: theme.palette.primary.main }}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Stack>
                </Grid>
            </CardContent>
        </Card>
    );
}
