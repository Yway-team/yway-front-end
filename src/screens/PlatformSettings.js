import React, {useState, useRef} from 'react'
import { Stack, Box, Avatar, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import { ColorPicker } from '../components';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useParams } from 'react-router-dom';
import SaveChangesModal from '../components/PlatformScreen/SaveChangesModal';
import {Checkbox, FormLabel, Grid} from "@mui/material";

import {CommonTitle, ConfirmationDialog} from "../components";
import ImageUpload from '../components/ImageUpload'

import TagsInput from '../components/TagsInput';

import usePrivilegedQuery from '../hooks/usePrivilegedQuery';
import { GET_PLATFORM_SETTINGS } from '../controllers/graphql/platform-queries';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_PLATFORM_SETTINGS } from '../controllers/graphql/platform-mutations';

import { LabelTextField } from '../components';

export default function PlatformSettings() {

    const { platformName } = useParams();
    // const { data: platformData } = usePrivilegedQuery(GET_PLATFORM_SETTINGS, { variables: { title: platformName } });
    // let platformSummary;
    // if (platformData) {
    //     platformSummary = platformData.getPlatformSummary;
    // }

    const [updatePlatformSettings] = useMutation(UPDATE_PLATFORM_SETTINGS);
    const saveNewPlatformSettings = async () => await updatePlatformSettings({ variables: {
        platformSettings: {
            title: tempPlatformName,
            bannerImg: bannerImage,
            thumbnailImg: avatarImage
        } } })

    const { data: platformSettingsData } = useQuery(GET_PLATFORM_SETTINGS);

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
    const [backgroundColor, setbackgroundColor] = useState(tempData.backgroundColor)
    const [bannerImage, setbannerImage] = useState(null)
    const [avatarImage, setavatarImage] = useState(null)
    const [creatorPoints, setcreatorPoints] = useState(tempData.minCreatorPoints)
    const [onlyModerators, setonlyModerators] = useState(tempData.onlyModSubmissions)

    let platformSettings;
    if (platformSettingsData) {
        platformSettings = platformSettingsData.getPlatformSettings;
        setbannerImage(platformSettings.bannerImg);
        setavatarImage(platformSettings.thumbnailImg);
    }

    // MODAL MANAGEMENT
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

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
        if (name === "Banner Image"){
            setbannerImage(data)
        }
        if (name === "Thumbnail Image"){
            setavatarImage(data)
        }
    }

    return (
        <>
            <SaveChangesModal open={open} handleOpen={handleOpen} handleClose={handleClose} saveNewPlatformSettings={saveNewPlatformSettings}/>
            <div style={{height: "200px", position:"relative", display: "flex", alignItems: "center"}}>
                <div style={{height: "100%",width: "100%", overflow:"hidden", position: "absolute", top:"0px", zIndex: "-1"}}>
                    <img style={{width: "100%"}} alt='cover' src="https://picsum.photos/1000" />
                    <div style={{backgroundColor:"#c2c2c250", width:"100%", height: "100%", position:"absolute", top:"0", left:"0"}}></div>
                </div>
                <Avatar alt="avatar" src="https://i.pravatar.cc/300"
                        sx={{
                        height: 150,
                        width: 150,
                        border: '0.2rem solid',
                        borderColor: 'common.white',
                        marginLeft: "5%",
                        display: "relative",
                        }}
                        imgProps={{ style: { borderRadius: '50%' } }} />
                {/* <h2 style={{color:"black", fontSize:"35px", marginLeft: "20px"}}>{platformName}</h2> */}
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
                        <LabelTextField label={"Platform Name"} value={tempPlatformName}
                            onChange={(e)=>setTempPlatformName(e.target.value)}/>
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
                        <div>
                        Background Color
                        </div>
                        <div style={{marginLeft:"-230px"}}>
                            <ColorPicker/>
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems:"center" }}>
                        {/* <div style={{paddingRight: "10px"}}>
                        Banner Image
                        </div>
                        <TextField size="small" id="standard-basic" variant="standard" style={{position:"relative", top:"-5px"}} value={bannerImage} onChange={setbannerImage}/> */}
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
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                        <TextField sx={{width:"30px"}} value="12" id="standard-basic" variant="standard"/>
                        <div>
                            Minimum number of creator points to submit a quiz.
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <FormControlLabel control={<Switch defaultChecked />} label="Only allow current moderators to submit quizzes" />
                    </Box>
                    <Stack direction="row" spacing={3}>
                        <Button variant="contained" onClick={handleOpen}>Submit</Button>
                        <Button variant="contained">Cancel</Button>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}
