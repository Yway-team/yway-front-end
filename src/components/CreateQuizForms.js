import { useReactiveVar } from "@apollo/client";
import { Checkbox, Grid, FormLabel, FormControlLabel } from "@mui/material";
import { quizDetailsVar, questionsVar } from "../screens/CreateQuizScreen";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { ColorPicker, ImageUpload, LabelTextField } from ".";

export default function CreateQuizForms({ numQuestions, updateNumQuestions, handleUpdateNumQuestions }) {
    const quizDetails = useReactiveVar(quizDetailsVar);
    const [numQuestionsText, setNumQuestionsText] = useState(numQuestions);
    const [previousUpdateNumQuestions, setPreviousUpdateNumQuestions] = useState(updateNumQuestions);
    const MAX_QUESTIONS = 100;
    if (updateNumQuestions !== previousUpdateNumQuestions) {
        setNumQuestionsText(numQuestions);
        setPreviousUpdateNumQuestions(!previousUpdateNumQuestions);
    }

    const theme = useTheme();
    const [quizColor, setQuizColor] = useState(theme.palette.primary);

    const handleSetColor = (color) => {
        setQuizColor(color.hex);
    }

    return (<>
        <Grid item>
            <FormLabel style={{ fontWeight: '700', fontSize: 16, color: 'common.black' }}>
                Quiz Details
            </FormLabel>
        </Grid>
        <Grid item>
            <LabelTextField label={"Platform"} value={quizDetails.platformName}
                onChange={e => {
                    let details = { ...quizDetails };
                    details.platformName = e.target.value;
                    quizDetailsVar(details);
                    }} />
        </Grid>
        <Grid item>
            <LabelTextField label={"Quiz Title"} value={quizDetails.title}
                onChange={e => {
                    let details = { ...quizDetails };
                    details.title = e.target.value;
                    quizDetailsVar(details);
                }} />
        </Grid>
        <Grid item>
            <LabelTextField name="description" label={"Description (optional)"} value={quizDetails.description}
                onChange={e => {
                    let details = { ...quizDetails };
                    details.description = e.target.value;
                    quizDetailsVar(details);
                }}
                multiline={true}
                variant={"outlined"} />
        </Grid>
        <Grid item>
            <ImageUpload label={"Banner Image"} />
        </Grid>
        <Grid item>
            <ImageUpload label={"Thumbnail Image"} />
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
                value={numQuestionsText}
                onChange={e => {
                    const value = Number(e.target.value);
                    if (value >= 0 && value <= MAX_QUESTIONS) {
                        setNumQuestionsText(value);
                    }
                }}
                onBlur={() => handleUpdateNumQuestions(numQuestionsText)}
                type={"number"} />
                    </Grid>
                    <Grid item>
                        <LabelTextField name="timeToAnswer" label={"Time to answer (seconds)"} type={"number"}
                            placeholder={quizDetails.timeToAnswer}
                            onChange={e => {
                                let details = { ...quizDetails };
                                details.timeToAnswer = Number(e.target.value);
                                quizDetailsVar(details);
                            }} />
                    </Grid>
                    <Grid item>
            <FormControlLabel label="Shuffle Questions" labelPlacement="start"
                style={{
                    padding: 0,
                    marginLeft: 0,
                    width: 280,
                    justifyContent: "space-between"
                }}
                control={<Checkbox onChange={e => {
                    let details = { ...quizDetails };
                    details.shuffleQuestions = e.target.checked;
                    quizDetailsVar(details);
                }} />}>
            </FormControlLabel>
        </Grid>
        <Grid item>
            <FormControlLabel label="Shuffle Answer Options" labelPlacement="start"
                style={{
                    padding: 0,
                    marginLeft: 0,
                    width: 280,
                    justifyContent: "space-between"
                }}
                control={<Checkbox onChange={e => {
                    let details = { ...quizDetails };
                    details.shuffleAnswers = e.target.checked;
                    quizDetailsVar(details);
                }} />}>
            </FormControlLabel>
        </Grid>
        <Grid item>
            {/*todo: get state from colorpicker*/}
            <ColorPicker label={"Color Style"} colorState={quizColor} onChangeComplete={color => handleSetColor(color)} />
        </Grid>
    </>);
}
