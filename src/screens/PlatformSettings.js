import React, {useState, useRef} from 'react'
import { Stack, Box, Avatar, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import { ColorPicker } from '../components';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useParams } from 'react-router-dom';
import {FormLabel} from "@mui/material";
import {CommonTitle, ConfirmationDialog} from "../components";
import ImageUpload from '../components/ImageUpload'
import TagsInput from '../components/TagsInput';
import { GET_PLATFORM_SUMMARY, GET_PLATFORM_SETTINGS } from '../controllers/graphql/platform-queries';
import { makeVar, useMutation, useQuery } from '@apollo/client';
import { UPDATE_PLATFORM_SETTINGS } from '../controllers/graphql/platform-mutations';
import { LabelTextField } from '../components';
import usePrivilegedQuery from '../hooks/usePrivilegedQuery';

export default function PlatformSettings() {

    const { platformName } = useParams();
    
    const [updatePlatformSettings] = useMutation(UPDATE_PLATFORM_SETTINGS);
    // const saveNewPlatformSettings = async () => updatePlatformSettings({ variables: {
    //     platformSettings: {
    //         title: tempPlatformName,
    //         bannerImg: bannerImg,
    //         thumbnailImg: thumbnailImg
    //     } } })

    // const { data: platformSettingsData } = useQuery(GET_PLATFORM_SETTINGS);
    // The above doesn't work. Must use usePrivilegedQuery.
    
    // Platform Data Fetching
    const { data: platformData } = usePrivilegedQuery(GET_PLATFORM_SUMMARY, { variables: { title: platformName } });
    let effectivePlatformData = {
        thumbnailImg: "https://cse416-content.s3.us-east-2.amazonaws.com/thumbnail.png",
        bannerImg: "https://cse416-content.s3.us-east-2.amazonaws.com/Banner+Image.png"
    }
    if (platformData){
        effectivePlatformData = platformData.getPlatformSummary
    }
    // Platform Settings Data Fetching
    const { data: platformSettingsData } = usePrivilegedQuery(GET_PLATFORM_SETTINGS, { variables: { title: platformName } });

    console.log(platformData)
    console.log(platformSettingsData)
    const [effectiveSettings, setEffectiveSettings] = useState({
        bannerImg: "test",
        thumbnailImg: "test",
        platformName: platformName
    })
    // if (platformSettingsData){
    //     effectiveSettings = platformSettingsData.getPlatformSettings
    // }

    const tempData = {
        _id: "test",
        bannerImg: "test",
        description: "test",
        thumbnailImg: "test",
        moderators: "test",
        title: "test",
        tags: "test",
        color: "test",
        minCreatorPoints: "test",
        onlyModSubmissions: "test",
        bannedUsers: "test",
        backgroundColor: "orange",
    }

    const [tempPlatformName, setTempPlatformName] = useState(platformName)
    const [onlyModerators, setonlyModerators] = useState(tempData.onlyModSubmissions)

    let platformSettings = {
        bannerImg: "test",
        thumbnailImg: "test"};
    // if (platformSettingsData) {
    //     platformSettings = platformSettingsData.getPlatformSettings;
    //     setbannerImage(platformSettings.bannerImg);
    //     setavatarImage(platformSettings.thumbnailImg);
    // }

    // TAG MANAGEMENT
    const tags = useRef([])
    const handleAddTag = () => {
        console.log(newTag)

        if (newTag === '' || tags.current.includes(newTag)) {
            return
        }
        tags.current.push(newTag)
        setNewTag('');
    }
    const handleDeleteTag = tagToDelete => () => {
        tags.current = tags.current.filter(tag=>tag!==tagToDelete)
    }
    const [newTag, setNewTag] = useState('')
    const onNewTagChange = (tag) => {
        setNewTag(tag);
    }

    // IMAGE UPLOAD MANAGEMENT
    const handleImageUpload = (name, data) => {
        setEffectiveSettings(prev=>{
            const mapNameToVar = {
                "Banner Image": "bannerImg",
                "Thumbnail Image": "thumbnailImg"
            }
            return {...prev, [`${mapNameToVar[name]}Name`]: name, [`${mapNameToVar[name]}Data`]: data}
        })
    }

    // Color Picker functions
    const [backgroundColor, setbackgroundColor] = useState(tempData.backgroundColor)
    const handleSetColor = (color) => {
        setbackgroundColor(color)
    }

    // Minimum required creator points
    const [creatorPoints, setcreatorPoints] = useState(0)
    const handleCreatorPoints = (e) => {
        setcreatorPoints(e.target.value)
    }

    // Confirmation Dialog
    const [publishConfirmOpen, setPublishConfirmOpen] = useState(false);
    const togglePublishConfirmOpen = () => {
        setPublishConfirmOpen(!publishConfirmOpen);
    };
    const handleSubmit = () => {
        alert("test")
    }
    const handleOpen = () => {
        setPublishConfirmOpen(true)
    }
    const handleClose = () => {
        setPublishConfirmOpen(false)
    }

    return (
        <>
            <div style={{height: "200px", position:"relative", display: "flex", alignItems: "center"}}>
                <div style={{height: "100%",width: "100%", overflow:"hidden", position: "absolute", top:"0px", zIndex: "-1"}}>
                    <img style={{width: "100%"}} alt='cover' src={effectivePlatformData.bannerImg} />
                    <div style={{backgroundColor:"#c2c2c250", width:"100%", height: "100%", position:"absolute", top:"0", left:"0"}}></div>
                </div>
                <Avatar alt="avatar" src={effectivePlatformData.thumbnailImg}
                        sx={{
                        height: 150,
                        width: 150,
                        border: '0.2rem solid',
                        borderColor: 'common.white',
                        marginLeft: "5%",
                        display: "relative",
                        }}
                        imgProps={{ style: { borderRadius: '50%' } }} />
                <Typography sx={{
                    fontWeight: '700',
                    fontSize: 35,
                    color: 'black',
                    ml: 5
                }
                }> {platformName}</Typography >

                <Box sx={{display:"flex", alignItems: 'flex-end', position:"absolute", left: "0px", bottom: "0px", width:"100%"}}>
                </Box>
            </div> 
            <Stack sx={{width: "100%", marginLeft: "4rem", marginTop: "4rem"}} spacing={4}>
                <Stack spacing={2}>
                    <FormLabel style={{fontWeight: '700', fontSize: 16, color: 'common.black'}}>
                        Platform Settings
                    </FormLabel>
                    <Stack direction="row" alignItems="baseline">
                        {/* <div style={{paddingRight: "10px"}}>
                        Platform Names
                        </div>
                        <TextField size="small" id="platformName" variant="standard" value={tempPlatformName} onChange={(e)=>setTempPlatformName(e.target.value)}/> */}
                        <LabelTextField label={"Platform Name"} value={effectiveSettings.platformName}
                            onChange={(e)=>{
                                setEffectiveSettings(prev=>{
                                    return {...prev, platformName: e.target.value}
                                })
                            }}/>
                    </Stack>
                    <Box sx={{ display: 'flex' }}>
                        <TagsInput tags={tags.current} handleAddTag={handleAddTag} handleDeleteTag={handleDeleteTag}
                                newTag={newTag} onNewTagChange={e => onNewTagChange(e.target.value)}/>
                    </Box>
                </Stack>

                <Stack spacing={2}>
                    <FormLabel style={{fontWeight: '700', fontSize: 16, color: 'common.black'}}>
                        Platform Style
                    </FormLabel>
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                        <ColorPicker label={"Background Color"} colorState={backgroundColor}
                                    onChangeComplete={color => handleSetColor(color)}/>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems:"center" }}>
                        <ImageUpload onUpload={handleImageUpload} label={"Banner Image"} />
                    </Box>
                    <Box sx={{ display: 'flex',  alignItems:"center" }}>
                        <ImageUpload onUpload={handleImageUpload} label={"Thumbnail Image"} />
                    </Box>
                </Stack>

                <Stack spacing={2}>
                    <FormLabel style={{fontWeight: '700', fontSize: 16, color: 'common.black'}}>
                        Quiz Rules
                    </FormLabel>
                    <LabelTextField label={"Required Creator Points"}
                                    value={creatorPoints}
                                    onChange={handleCreatorPoints}
                                    type={"number"}/>
                    <Box sx={{ display: 'flex' }}>
                        <FormControlLabel control={<Switch defaultChecked />} label="Only allow current moderators to submit quizzes" />
                    </Box>
                    <Stack direction="row" spacing={3}>
                        <Button variant="contained" onClick={handleOpen}>Submit</Button>
                        <Button variant="contained">Cancel</Button>
                    </Stack>
                </Stack>
            </Stack>
            <ConfirmationDialog
                open={publishConfirmOpen}
                handleClose={togglePublishConfirmOpen}
                title='Confirm Changes'
                content={`Are you sure you want to save changes?`}
                yesText='PUBLISH'
                yesCallback={handleSubmit}
                noText='CANCEL'
                noCallback={togglePublishConfirmOpen}
            />
        </>
    )
}
