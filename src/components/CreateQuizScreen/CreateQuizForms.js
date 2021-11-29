import {useReactiveVar} from "@apollo/client";
import {Checkbox, FormControlLabel, FormLabel, Grid} from "@mui/material";
import {quizDetailsVar} from "../../screens/CreateQuizScreen";
import React, {useState} from "react";
import {ColorPicker, ImageUpload, LabelTextField} from "..";
import TagsInput from "../TagsInput";

export default function CreateQuizForms({numQuestions, updateNumQuestions, handleUpdateNumQuestions}) {
    const quizDetails = useReactiveVar(quizDetailsVar);
    const [numQuestionsText, setNumQuestionsText] = useState(numQuestions);
    const [previousUpdateNumQuestions, setPreviousUpdateNumQuestions] = useState(updateNumQuestions);
    const bannerImgLabel = 'Banner Image';
    const thumbnailImgLabel = 'Thumbnail Image';
    const [newTag, setNewTag] = useState('')
    const MAX_QUESTIONS = 100;
    if (updateNumQuestions !== previousUpdateNumQuestions) {
        setNumQuestionsText(numQuestions);
        setPreviousUpdateNumQuestions(!previousUpdateNumQuestions);
    }

    const handleSetColor = (color) => {
        let details = {...quizDetails};
        details.color = color.hex;
        quizDetailsVar(details);
    };

    const handleImageUpload = (name, data) => {
        const newQuizDetails = { ...quizDetails };
        console.log(`name: ${name}`);
        console.log(name === bannerImgLabel);
        console.log(data);
        if (name === bannerImgLabel) {
            newQuizDetails.bannerImgData = data;
            console.log(newQuizDetails);
            quizDetailsVar(newQuizDetails);
        } else if (name === thumbnailImgLabel) {
            newQuizDetails.thumbnailImgData = data;
            quizDetailsVar(newQuizDetails);
        } else {
            console.error(`CreateQuizForms.handleImageUpload: argument 'name' must be one of '${bannerImgLabel}' or '${thumbnailImgLabel}'`)
        }
        console.log(quizDetailsVar());
    };

    const handleAddTag = () => {
        if (newTag === '' || quizDetails.tags.includes(newTag)) {
            return
        }
        let details = {...quizDetails};
        details.tags = details.tags.concat(newTag);
        quizDetailsVar(details);
        setNewTag('');
    }

    const handleDeleteTag = tagToDelete => () => {
        let details = {...quizDetails};
        details.tags = details.tags.filter((tag) => tag !== tagToDelete);
        quizDetailsVar(details);
    }
    const onNewTagChange = (tag) => {
        setNewTag(tag);
    }

    return (<>
        <Grid item>
            <FormLabel style={{fontWeight: '700', fontSize: 16, color: 'common.black'}}>
                Quiz Details
            </FormLabel>
        </Grid>
        <Grid item>
            <LabelTextField label={"Platform"} value={quizDetails.platformName}
                            onChange={e => {
                                let details = {...quizDetails};
                                details.platformName = e.target.value;
                                quizDetailsVar(details);
                            }}/>
        </Grid>
        <Grid item>
            <LabelTextField label={"Quiz Title"} value={quizDetails.title}
                            onChange={e => {
                                let details = {...quizDetails};
                                details.title = e.target.value;
                                quizDetailsVar(details);
                            }}/>
        </Grid>
        <Grid item>
            <LabelTextField name="description" label={"Description (optional)"} value={quizDetails.description}
                            onChange={e => {
                                let details = {...quizDetails};
                                details.description = e.target.value;
                                quizDetailsVar(details);
                            }}
                            multiline={true}
                            variant={"outlined"}/>
        </Grid>
        <Grid item>
            <TagsInput tags={quizDetails.tags} handleAddTag={handleAddTag} handleDeleteTag={handleDeleteTag}
                       newTag={newTag} onNewTagChange={e => onNewTagChange(e.target.value)}>
            </TagsInput>
        </Grid>
        <Grid item>
            <ImageUpload onUpload={handleImageUpload} label={bannerImgLabel} />
        </Grid>
        <Grid item>
            <ImageUpload onUpload={handleImageUpload} label={thumbnailImgLabel} />
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
                            type={"number"}/>
        </Grid>
        <Grid item>
            <LabelTextField name="timeToAnswer" label={"Time to answer (seconds)"} type={"number"}
                            placeholder={quizDetails.timeToAnswer}
                            onChange={e => {
                                let details = {...quizDetails};
                                details.timeToAnswer = Number(e.target.value);
                                quizDetailsVar(details);
                            }}/>
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
                                  let details = {...quizDetails};
                                  details.shuffleQuestions = e.target.checked;
                                  quizDetailsVar(details);
                              }}/>}>
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
                                  let details = {...quizDetails};
                                  details.shuffleAnswers = e.target.checked;
                                  quizDetailsVar(details);
                              }}/>}>
            </FormControlLabel>
        </Grid>
        <Grid item>
            <ColorPicker label={"Color Style"} colorState={quizDetails.color}
                         onChangeComplete={color => handleSetColor(color)}/>
        </Grid>
    </>);
}
