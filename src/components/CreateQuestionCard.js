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
import { questionsVar } from "../screens/CreateQuizScreen";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// index: Int
// answerOptions: [String]
// correctAnswerIndex: Number
// question: String


export default function CreateQuestionCard({ questionIndex, handleDeleteQuestion }) {
    // All state for the CreateQuestionCard must be handled here. Doing it in CreateQuizScreen is just too slow.
    let question = questionsVar()[questionIndex];
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(question.correctAnswerIndex);
    const [answerOptions, setAnswerOptions] = useState(question.answerOptions);
    const [answerOptionsIds, setAnswerOptionIds] = useState(Array(question.answerOptions.length).fill(null).map(() => uuidv4()));
    const theme = useTheme();

    const updateQuestionsVar = question => {
        const questions = questionsVar();
        questions[questionIndex] = question;
        questionsVar(questions);
        question = questionsVar()[questionIndex]
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
                    onClick={() => handleDeleteQuestion(questionIndex)}>
                    <CloseIcon />
                </IconButton>
            </Grid>
            <CardContent>
                <Grid padding={2} spacing={2} rowSpacing={3}>
                    <TextField label="Question" variant="standard" fullWidth multiline
                        defaultValue={question.description} onBlur={e => {
                            question.description = e.target.value;
                            updateQuestionsVar(question);
                        }}
                        sx={{ mb: 2 }} />
                    {answerOptions.map((option, index) =>
                        <Stack key={answerOptionsIds[index]} direction={'row'} justifyItems={"baseline"}>
                            <TextField defaultValue={option} label={`Option ${index + 1}`} multiline
                                variant="standard"
                                onBlur={e => {
                                    question.answerOptions[index] = e.target.value;
                                    setAnswerOptions([...question.answerOptions]);
                                    updateQuestionsVar(question);
                                }}
                                fullWidth
                                sx={{ mb: 2 }} />
                            <FormControlLabel label="Correct"
                                value={index}
                                control={<Radio
                                    checked={correctAnswerIndex === index}
                                    name={"correct"}
                                    value={correctAnswerIndex}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            question.correctAnswerIndex = index;
                                            setCorrectAnswerIndex(question.correctAnswerIndex);
                                            updateQuestionsVar(question);
                                        }
                                        }} />}>
                            </FormControlLabel>
                            <IconButton aria-label="delete option" sx={{ color: theme.palette.primary.main }}
                                onClick={() => {
                                    question.answerOptions.splice(index, 1);
                                    console.log(question.answerOptions);
                                    setAnswerOptions([...question.answerOptions]);
                                    setAnswerOptionIds(answerOptionsIds.filter((_, answerOptionindex) => answerOptionindex !== index));
                                    if (correctAnswerIndex === index) {
                                        question.correctAnswerIndex = -1;
                                        setCorrectAnswerIndex(-1);
                                    } else if (correctAnswerIndex > index) {
                                        question.correctAnswerIndex -= 1;
                                        setCorrectAnswerIndex(correctAnswerIndex - 1);
                                    }
                                    updateQuestionsVar(question);
                                    }}>
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    )}
                    <Stack direction="row" justifyContent="space-between" sx={{ paddingTop: 4 }}>
                        <Button variant={"outlined"} endIcon={<AddCircleOutlinedIcon />}
                            onClick={() => {
                                question.answerOptions.push('');
                                setAnswerOptions([...question.answerOptions]);
                                setAnswerOptionIds([...answerOptionsIds, uuidv4()]);
                                updateQuestionsVar(question);
                            }}>Add Option</Button>
                        <IconButton aria-label="duplicate question" sx={{ color: theme.palette.primary.main }}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Stack>
                </Grid>
            </CardContent>
        </Card>
    );
}
