import React, {useState} from "react";
import {Button, Checkbox, FormControlLabel, FormLabel, Grid, Stack, TextField, Typography} from "@mui/material";
import {ColorPicker, CommonTitle, ConfirmationDialog, ImageUpload, LabelTextField} from "../components";
import {useMutation} from "@apollo/client";
import {CREATE_PLATFORM} from "../controllers/graphql/platform-mutations";
import TagsInput from "../components/TagsInput";
import {globalState} from "../state/UserState";
import {useHistory} from "react-router-dom";

export default function CreatePlatformScreen() {
    const history = useHistory();
    const [createPlatform] = useMutation(CREATE_PLATFORM);
    const [platformName, setPlatformName] = useState('');
    const [platformDescription, setPlatformDescription] = useState('');
    const [minCreatorPts, setMinCreatorPts] = useState(0);
    const [onlyModSubmissions, setOnlyModSubmissions] = useState(false);
    const [platformColor, setPlatformColor] = useState(null);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [bannerImg, setBannerImg] = useState(null);
    const [bannerImgName, setBannerImgName] = useState('');
    const [thumbnailImg, setThumbnailImg] = useState(null);
    const [thumbnailImgName, setThumbnailImgName] = useState('');
    const [publishConfirmOpen, setPublishConfirmOpen] = useState(false);
    const bannerImgLabel = 'Banner Image';
    const thumbnailImgLabel = 'Thumbnail Image';
    const [titleValid, setTitleValid] = useState(true);
    const [titleErrorMsg, setTitleErrorMsg] = useState('');
    // const platformErrorVar = makeVar({
    //     titleValid: true,
    //     errorMsgs: {title: ''}
    // });

    const handleImageUpload = (name, filename, data) => {
        if (name === bannerImgLabel) {
            setBannerImg(data);
            setBannerImgName(filename);
        } else if (name === thumbnailImgLabel) {
            setThumbnailImg(data);
            setThumbnailImgName(filename);
        } else {
            console.error(`CreatePlatform.handleImageUpload: argument 'name' must be one of '${bannerImgLabel}' or '${thumbnailImgLabel}'`)
        }
    };

    const handleRemoveImage = (name) => {
        if (name === bannerImgLabel) {
            setBannerImg('');
            setBannerImgName(null);
        } else if (name === thumbnailImgLabel) {
            setThumbnailImg('');
            setThumbnailImgName(null);
        } else {
            console.error(`CreatePlatform.handleRemoveImage: argument 'name' must be one of '${bannerImgLabel}' or '${thumbnailImgLabel}'`)
        }
    }

    const togglePublishConfirmOpen = () => {
        setPublishConfirmOpen(!publishConfirmOpen);
    };

    const handleAddTag = () => {
        if (newTag === '' || tags.includes(newTag)) {
            return
        }
        setTags((tags) => tags.concat(newTag));
        setNewTag('');
        console.log(tags)
    }

    const handleDeleteTag = tagToDelete => () => {
        setTags(tags => tags.filter((tag) => tag !== tagToDelete));
        console.log(tags)
    }
    const onNewTagChange = (tag) => {
        setNewTag(tag);
    }

    function validate() {
        if (platformName.length === 0) {
            setTitleValid(false);
            setTitleErrorMsg('Platform name cannot be empty.');
            return false;
        } else {
            setTitleValid(true);
            setTitleErrorMsg('');
            return true;
        }
    }

    const handleSubmit = async (e) => {
        togglePublishConfirmOpen();
        e.preventDefault();
        console.log('banner', bannerImg);
        console.log('thumbnail', thumbnailImg);
        const platformObj = {
            title: platformName,
            description: platformDescription,
            minCreatorPoints: minCreatorPts,
            onlyModSubmissions: onlyModSubmissions,
            color: platformColor,
            tags: tags,
            bannerImgData: bannerImg,
            bannerImgName: bannerImgName,
            thumbnailImgData: thumbnailImg,
            thumbnailImgName: thumbnailImgName
        };
        const {data} = await createPlatform({variables: {platform: platformObj}});
        if (data) {
            const platformId = data.createPlatform;
            console.log(`Platform ID: ${platformId}`);
            if (platformId === 'name taken') {
                setTitleValid(false);
                setTitleErrorMsg('Platform name is taken. Choose another name.');
            } else {
                history.push(`/user/${globalState()._id}/platforms`);
            }
        }
    };

    const handleCancel = async (e) => {
        e.preventDefault();
    };

    const handleSetColor = (color) => {
        setPlatformColor(color.hex);
    }

    return (
        <><Grid container direction="column" sx={{p: 2, pl: 10, width: 700}}>
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
                                        error={!titleValid}
                                        helperText={titleErrorMsg}
                                        onChange={e => setPlatformName(e.target.value)}/>
                    </Grid>
                    <Grid item>
                        <LabelTextField name="description" label={"Description (optional)"} value={platformDescription}
                                        onChange={e => setPlatformDescription(e.target.value)} multiline={true}
                                        variant={"outlined"}/>
                    </Grid>
                    <Grid item>
                        <TagsInput tags={tags} handleAddTag={handleAddTag} handleDeleteTag={handleDeleteTag}
                                   newTag={newTag} onNewTagChange={e => onNewTagChange(e.target.value)}>
                        </TagsInput>
                    </Grid>
                    <Grid item marginTop={4}>
                        <FormLabel style={{
                            fontWeight: '700', fontSize: 16, color: 'common.black'
                        }}>
                            Platform Style
                        </FormLabel>
                    </Grid>
                    <Grid item>
                        <ColorPicker label={"Background Color"} colorState={platformColor}
                                     onChangeComplete={(color) => handleSetColor(color)}/>
                    </Grid>
                    <Grid item>
                        <ImageUpload label={"Banner Image"} onUpload={handleImageUpload} onRemove={handleRemoveImage}/>
                    </Grid>
                    <Grid item>
                        <ImageUpload label={"Thumbnail Image"} onUpload={handleImageUpload}
                                     onRemove={handleRemoveImage}/>
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
                                       onChange={e => {
                                           const value = Number(e.target.value);
                                           if (value >= 0) {
                                               setMinCreatorPts(value)
                                           }
                                       }
                                       } style={{width: 60}} type={"number"}>
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
                                              onChange={e => setOnlyModSubmissions(e.target.checked)}/>}
                        />
                    </Grid>
                    <Stack direction={"row"} spacing={2} style={{marginLeft: 16}}>
                        <Button variant={"contained"} onClick={() => {
                            const valid = validate();
                            if (valid) togglePublishConfirmOpen();
                        }}>CREATE</Button>
                        <Button variant={"outlined"} onClick={handleCancel}>CANCEL</Button>
                    </Stack>
                </Grid>
            </form>
        </Grid>
            <ConfirmationDialog
                open={publishConfirmOpen}
                handleClose={togglePublishConfirmOpen}
                title='CREATE PLATFORM'
                content={`Are you sure you want to create this platform?`}
                yesText='PUBLISH'
                yesCallback={handleSubmit}
                noText='CANCEL'
                noCallback={togglePublishConfirmOpen}
            />
        </>
    )
}
