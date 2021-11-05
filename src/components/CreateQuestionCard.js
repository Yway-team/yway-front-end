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
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import {useTheme} from "@mui/material/styles";
import React, {useState} from "react";

// index: Int
// answerOptions: [String]
// correctAnswer: String
// question: String


export default function CreateQuestionCard({
                                               questionIndex,
                                               questionStr,
                                               answerOptions,
                                               correctAnswer,
                                               handleRemoveQuestion
                                           }) {
    const theme = useTheme();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [correct, setCorrect] = useState(0);

    const handleAddOption = () => {
        setOptions(options => [...options, '']);
        console.log(options);
        console.log("correct", correct);
    }

    const handleRemoveOption = (index) => {
        setOptions(options.filter((value, i) => i !== index));
        // console.log(options);
    };

    const handleSelectedAnswer = (e) => {
        setCorrect(e.target.value);
        // setOptions(options.filter((value, i) => i !== index));
        console.log("correct", correct);
    };

    const updateOption = index => e => {
        let newArr = [...options];
        newArr[index] = e.target.value;
        // console.log(e.target.value);
        setOptions(newArr);
        // console.log("options", options);
        // console.log("correct", correct);
    }

    return (
        <Card variant="outlined" sx={{maxWidth: 700, m: 2, borderColor: theme.palette.primary.main, borderRadius: 2}}>
            <Grid container justifyContent="space-between">
                <Grid item container direction="row" sx={{
                    backgroundColor: theme.palette.primary.main,
                    height: "60px",
                    width: "60px",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: "0px 0px 55px 0px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)"
                }}
                >
                    <Grid
                        container
                        item
                        xs={12}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: 20,
                                color: theme.palette.common.white
                            }}
                        >
                            {questionIndex + 1}
                        </Typography>
                    </Grid>
                </Grid>
                <IconButton aria-label="delete question" sx={{color: theme.palette.primary.main}}
                            onClick={() => handleRemoveQuestion(questionIndex)}>
                    <CloseIcon/>
                </IconButton>
            </Grid>
            <CardContent>
                <Grid padding={2}>
                    <TextField label="Question" variant="standard" fullWidth
                               onChange={(e) => setQuestion(e.target.value)}/>
                    {options.map((data, index) =>
                        <Stack direction={'row'} justifyItems={"baseline"}>
                            <TextField key={data._id} {...data} value={options[index]} label={`Option ${index + 1}`}
                                       variant="standard"
                                       onChange={updateOption(index)}
                                       fullWidth/>
                            <FormControlLabel label="Correct"
                                              value={index}
                                              control={<Radio
                                                  checked={correct === index}
                                                  name={"correct"}
                                                  value={index}
                                                  onChange={() => setCorrect(index)}/>}>
                            </FormControlLabel>
                            <IconButton aria-label="delete option" sx={{color: theme.palette.primary.main}}
                                        onClick={() => handleRemoveOption(index)}>
                                <CloseIcon/>
                            </IconButton>
                        </Stack>
                    )}
                    <Stack direction="row" justifyContent="space-between" sx={{paddingTop: 4}}>
                        <Button variant={"outlined"} endIcon={<AddCircleOutlinedIcon/>} onClick={handleAddOption}> Add
                            Option</Button>
                        <IconButton aria-label="copy question" sx={{color: theme.palette.primary.main}}>
                        </IconButton>
                    </Stack>
                </Grid>
            </CardContent>
        </Card>
    );
}
