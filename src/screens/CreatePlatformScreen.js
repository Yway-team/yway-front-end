import React, {useState} from "react";
import {Button, FormControlLabel, FormLabel, Grid, Stack, Switch, TextField, Typography} from "@mui/material";
import {ColorPicker, CommonTitle, ImageUpload, LabelTextField} from "../components";

export default function CreatePlatformScreen() {

    const [platform, setPlatform] = useState('');
    const [quizTitle, setQuizTitle] = useState('');
    const [platformDescription, setPlatformDescription] = useState('');
    const [minCreatorPts, setMinCreatorPts] = useState('0');
    const [onlyModSubmissions, setOnlyModSubmissions] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()
    };

    return (
        <Grid container direction="column" sx={{p: 2, pl: 10}}>
            <Grid item>
                <CommonTitle title='CREATE PLATFORM'/>
            </Grid>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container item direction="column" sx={{p: 2}} spacing={2}>
                    <Grid item>
                        <FormLabel style={{fontWeight: '700', fontSize: 16, color: 'common.black'}}>
                            Platform Details
                        </FormLabel>
                    </Grid>
                    <Grid item>
                        <LabelTextField label={"Platform Name"} value={platform}
                                        onChange={e => setPlatform(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <LabelTextField name="description" label={"Description (optional)"} value={platformDescription}
                                        onChange={e => setPlatformDescription(e.target.value)} multiline={true}
                                        variant={"outlined"}/>
                    </Grid>
                    <Grid item marginTop={4}>
                        <FormLabel style={{
                            fontWeight: '700', fontSize: 16, color: 'common.black'
                        }}>
                            Platform Style
                        </FormLabel>
                    </Grid>
                    <Grid item>
                        <ColorPicker label={"Background Color"}/>
                    </Grid>
                    <Grid item>
                        <ImageUpload label={"Banner Image"}/>
                    </Grid>
                    <Grid item>
                        <ImageUpload label={"Profile Image"}/>
                    </Grid>
                    <Grid item marginTop={4}>
                        <FormLabel style={{
                            fontWeight: '700', fontSize: 16, color: 'common.black'
                        }}>
                            Quiz Rules
                        </FormLabel>
                    </Grid>
                    <Grid item>
                        <Stack direction={'row'} alignItems={'baseline'} spacing={2}>
                            <TextField variant={"standard"} value={minCreatorPts}
                                       onChange={e => setMinCreatorPts(e.target.value)}
                                       style={{width: 32}} type={"number"}>
                            </TextField>
                            <Typography>
                                Minimum number of creator points to submit a quiz
                            </Typography>
                        </Stack>
                    </Grid>

                    <Grid item>
                        <FormControlLabel control={<Switch value={onlyModSubmissions}
                                                           onChange={e => setOnlyModSubmissions(e.target.value.checked)}/>}
                                          label="Only allow current moderators to submit quizzes"/>
                    </Grid>


                    <Stack direction={"row"} spacing={2} style={{marginLeft: 16, paddingTop: 40}}>
                        <Button variant={"contained"} type={"submit"}>CREATE</Button>
                        <Button variant={"outlined"} type={"submit"}>CANCEL</Button>
                    </Stack>
                </Grid>
            </form>
        </Grid>
    )
}
