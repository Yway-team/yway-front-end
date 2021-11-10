import React, {useState} from "react";
import {Button, Checkbox, FormControlLabel, FormLabel, Grid, Stack, TextField, Typography} from "@mui/material";
import {ColorPicker, CommonTitle, ImageUpload, LabelTextField} from "../components";
import {useMutation} from "@apollo/client";
import {CREATE_PLATFORM} from "../controllers/graphql/platform-mutations";
import {useTheme} from "@emotion/react";

export default function CreatePlatformScreen() {
    const theme = useTheme();
    const [createPlatform] = useMutation(CREATE_PLATFORM);
    const [platformName, setPlatformName] = useState('');
    const [platformDescription, setPlatformDescription] = useState('');
    const [minCreatorPts, setMinCreatorPts] = useState(0);
    const [onlyModSubmissions, setOnlyModSubmissions] = useState(false);
    const [platformColor, setPlatformColor] = useState(theme.palette.primary)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const platformObj = {
            title: platformName,
            description: platformDescription,
            minCreatorPoints: minCreatorPts,
            onlyModSubmissions: onlyModSubmissions
        };
        const {data} = await createPlatform({variables: {platform: platformObj}});
        if (data) {
            const platformId = data.createPlatform;
            console.log(`Platform ID: ${platformId}`);
        }
    };

    const handleCancel = async (e) => {
        e.preventDefault();
    };

    const handleSetColor = (color) => {
        setPlatformColor(color.hex);
    }

    return (
        <Grid container direction="column" sx={{p: 2, pl: 10, width: 700}}>
            <Grid item>
                <CommonTitle title='CREATE PLATFORM'/>
            </Grid>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container item direction="column" sx={{py: 2}} spacing={2}>
                    <Grid item>
                        <FormLabel style={{fontWeight: '700', fontSize: 16, color: 'common.black'}}>
                            Platform Details
                        </FormLabel>
                    </Grid>
                    <Grid item>
                        <LabelTextField label={"Platform Name"} value={platformName}
                                        onChange={e => setPlatformName(e.target.value)}/>
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
                        <ColorPicker label={"Background Color"} colorState={platformColor} onChangeComplete={(color)=>handleSetColor(color)}/>
                    </Grid>
                    <Grid item>
                        <ImageUpload label={"Banner Image"}/>
                    </Grid>
                    <Grid item>
                        <ImageUpload label={"Thumbnail Image"}/>
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

                            <Typography sx={{width: 404}}>
                                Minimum number of creator points to submit a quiz
                            </Typography>
                            <TextField variant={"standard"} value={minCreatorPts}
                                       onChange={e => setMinCreatorPts(Number(e.target.value))}
                                       style={{width: 60}} type={"number"}>
                            </TextField>
                        </Stack>
                    </Grid>

                    <Grid item>
                        <FormControlLabel label="Only allow current moderators to submit quizzes"
                                          labelPlacement={"start"} style={{
                            padding: 0,
                            marginLeft: 0,
                            width: 450,
                            justifyContent: "space-between"
                        }} control={<Checkbox value={onlyModSubmissions}
                                              onChange={e => setOnlyModSubmissions(e.target.value.checked)}/>}
                        />
                    </Grid>
                    <Stack direction={"row"} spacing={2} style={{marginLeft: 16, paddingTop: 40}}>
                        <Button variant={"contained"} type={"submit"}>CREATE</Button>
                        <Button variant={"outlined"} onClick={handleCancel}>CANCEL</Button>
                    </Stack>
                </Grid>
            </form>
        </Grid>
    )
}
