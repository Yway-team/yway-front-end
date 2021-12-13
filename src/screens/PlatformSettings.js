import React, {useState} from 'react'
import {Avatar, Box, Checkbox, FormLabel, Stack, TextField, Typography} from '@mui/material'
import {ColorPicker, ConfirmationDialog, LabelTextField} from '../components';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useParams} from 'react-router-dom';
import ImageUpload from '../components/ImageUpload'
import TagsInput from '../components/TagsInput';
import {GET_PLATFORM_SETTINGS} from '../controllers/graphql/platform-queries';
import {useMutation} from '@apollo/client';
import {DELETE_PLATFORM, UPDATE_PLATFORM_SETTINGS} from '../controllers/graphql/platform-mutations';
import usePrivilegedQuery from '../hooks/usePrivilegedQuery';
import {useHistory} from 'react-router';
import LoadedModal from '../components/PlatformScreen/LoadedModal'
import CircularProgress from '@mui/material/CircularProgress';
import {RATE_QUIZ} from "../controllers/graphql/quiz-mutations";
import {globalState} from "../state/UserState";

let defaultImages = {
    thumbnailImg: "https://cse416-content.s3.us-east-2.amazonaws.com/thumbnail.png",
    bannerImg: "https://cse416-content.s3.us-east-2.amazonaws.com/Banner+Image.png"
}

export default function PlatformSettings() {

    const {platformName} = useParams();
    const history = useHistory()

    const [updatePlatformSettings] = useMutation(UPDATE_PLATFORM_SETTINGS);
    // Platform Settings Data Fetching
    // Loading management
    const {data: platformSettingsData} = usePrivilegedQuery(GET_PLATFORM_SETTINGS, {variables: {title: platformName}});
    const [loading, setLoading] = useState(true)

    console.log(platformName)
    console.log(platformSettingsData)
    const [effectiveSettings, setEffectiveSettings] = useState({
        bannerImgData: null,
        thumbnailImgData: null,
        title: platformName,
        creatorPoints: 0,
        updated: false,
        tags: []
    })
    if (platformSettingsData && "getPlatformSettings" in platformSettingsData && !effectiveSettings.updated && loading) {
        console.log("updated platformSettings")
        console.log(platformSettingsData.getPlatformSettings)
        setLoading(false)
        if (platformSettingsData.getPlatformSettings) {
            setEffectiveSettings({...platformSettingsData.getPlatformSettings, updated: true})
        }
    }

    // TAG MANAGEMENT
    const [newTag, setNewTag] = useState('')
    const handleAddTag = () => {
        const tags = effectiveSettings.tags
        if (newTag === '' || tags.includes(newTag)) {
            return
        }
        setEffectiveSettings(prev => {
            return {...prev, tags: [...tags, newTag]}
        })
        setNewTag("")
    }
    const handleDeleteTag = tagToDelete => () => {
        const tags = effectiveSettings.tags
        setEffectiveSettings(prev => {
            return {...prev, tags: tags.filter(tag => tag !== tagToDelete)}
        })
        setNewTag("")
    }
    const onNewTagChange = (tag) => {
        setNewTag(tag);
    }

    // IMAGE UPLOAD MANAGEMENT
    // const handleImageUpload = (name, data) => {
    //     setEffectiveSettings(prev=>{
    //         const mapNameToVar = {
    //             "Banner Image": "bannerImg",
    //             "Thumbnail Image": "thumbnailImg"
    //         }
    //         return {...prev, [`${mapNameToVar[name]}Name`]: name, [`${mapNameToVar[name]}Data`]: data}
    //     })
    // }
    const handleImageUpload = (name, filename, data) => {
        setEffectiveSettings(prev => {
            const mapNameToVar = {
                "Banner Image": "bannerImg",
                "Thumbnail Image": "thumbnailImg"
            }
            const newState = {[`${mapNameToVar[name]}Name`]: filename, [`${mapNameToVar[name]}Data`]: data}
            console.log(newState)

            return {...prev, ...newState}
        })
    };

    // Color Picker functions
    const handleSetColor = (color) => {
        setEffectiveSettings(prev => {
            return {...prev, color: color.hex}
        })
    }

    // Confirmation and Loading Dialog
    const [publishConfirmOpen, setPublishConfirmOpen] = useState(false);
    const [loadedModalOpen, setLoadedModalOpen] = useState(false)
    const togglePublishConfirmOpen = () => {
        setPublishConfirmOpen(!publishConfirmOpen);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("show effectiveSettings")
        console.log(effectiveSettings)
        const packedSettings = {
            bannerImgData: effectiveSettings.bannerImgData,
            thumbnailImgData: effectiveSettings.thumbnailImgData,
            color: effectiveSettings.color,
            description: effectiveSettings.description,
            minCreatorPoints: effectiveSettings.minCreatorPoints,
            onlyModSubmissions: effectiveSettings.onlyModSubmissions,
            tags: effectiveSettings.tags,
            title: effectiveSettings.title,
            platformId: effectiveSettings._id
        }
        console.log(packedSettings)
        await updatePlatformSettings({variables: {platformSettings: packedSettings}})
            .then(data => {
                const newSettings = data.updatePlatformSettings
                setEffectiveSettings({...newSettings, updated: true})
            })
            .catch(data => console.log(data));
        setPublishConfirmOpen(false)
        setLoadedModalOpen(true)
    };
    const handleOpen = () => {
        setPublishConfirmOpen(true)
    }
    const handleClose = () => {
        setPublishConfirmOpen(false)
    }
    const [deletePlatform] = useMutation(DELETE_PLATFORM, {variables: {title: platformName}});
    const [deletePlatformConfirmOpen, setDeletePlatformConfirmOpen] = useState(false);
    const handleDeletePlatform = async () => {
        const {data} = await deletePlatform({variables: {title: platformName}});
        if(data){
            console.log(data)
        }
    }

    return (
        <>
            <div style={{height: "200px", position: "relative", display: "flex", alignItems: "center"}}>
                <div style={{
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    position: "absolute",
                    top: "0px",
                    zIndex: "-1"
                }}>
                    <img style={{width: "100%"}} alt='cover'
                         src={effectiveSettings.bannerImg ? effectiveSettings.bannerImg : defaultImages.bannerImg}/>
                    <div style={{
                        backgroundColor: "#c2c2c250",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: "0",
                        left: "0"
                    }}></div>
                </div>
                <Avatar alt="avatar"
                        src={effectiveSettings.thumbnailImg ? effectiveSettings.thumbnailImg : defaultImages.thumbnailImg}
                        sx={{
                            height: 150,
                            width: 150,
                            border: '0.2rem solid',
                            borderColor: 'common.white',
                            marginLeft: "5%",
                            display: "relative",
                        }}
                        imgProps={{style: {borderRadius: '50%'}}}/>
                <Typography sx={{
                    fontWeight: '700',
                    fontSize: 35,
                    color: 'black',
                    ml: 5
                }
                }> {platformName}</Typography>

                <Box sx={{
                    display: "flex",
                    alignItems: 'flex-end',
                    position: "absolute",
                    left: "0px",
                    bottom: "0px",
                    width: "100%"
                }}>
                </Box>
            </div>
            <Box sx={{marginLeft: "50%", marginTop: "100px", display: loading ? "" : "none"}}>
                <CircularProgress/>
            </Box>
            {platformSettingsData && platformSettingsData.getPlatformSettings ?
                <Stack sx={{
                    width: "100%",
                    marginLeft: "4rem",
                    marginTop: "4rem",
                    minHeight: "700px",
                    display: loading ? "none" : ""
                }} spacing={4}>
                    <Stack spacing={2}>
                        <FormLabel style={{fontWeight: '700', fontSize: 16, color: 'common.black'}}>
                            Platform Settings
                        </FormLabel>
                        <LabelTextField label={"Platform Name"} value={effectiveSettings.title}
                                        disabled onChange={(e) => {
                            /*setEffectiveSettings(prev=>{
                                return {...prev, title: e.target.value}
                            })*/
                        }}/>
                        <LabelTextField label={"Description"} variant={"outlined"} multiline={true}
                                        value={effectiveSettings.description}
                                        onChange={(e) => {
                                            setEffectiveSettings(prev => {
                                                return {...prev, description: e.target.value}
                                            })
                                        }}/>
                        <Stack direction="row" alignItems="baseline">
                            {/* <div style={{paddingRight: "10px"}}>
                        Platform Names
                        </div>
                        <TextField size="small" id="platformName" variant="standard" value={tempPlatformName} onChange={(e)=>setTempPlatformName(e.target.value)}/> */}
                        </Stack>
                        <Box sx={{display: 'flex'}}>
                            <TagsInput tags={effectiveSettings.tags} handleAddTag={handleAddTag}
                                       handleDeleteTag={handleDeleteTag}
                                       newTag={newTag} onNewTagChange={e => onNewTagChange(e.target.value)}/>
                        </Box>
                    </Stack>

                    <Stack spacing={2}>
                        <FormLabel style={{fontWeight: '700', fontSize: 16, color: 'common.black'}}>
                            Platform Style
                        </FormLabel>
                        <Box sx={{display: 'flex', alignItems: "center"}}>
                            <ColorPicker label={"Background Color"} colorState={effectiveSettings.color}
                                         onChangeComplete={color => handleSetColor(color)}/>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: "center"}}>
                            <ImageUpload onUpload={handleImageUpload} label={"Banner Image"}/>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: "center"}}>
                            <ImageUpload onUpload={handleImageUpload} label={"Thumbnail Image"}/>
                        </Box>
                    </Stack>

                    <Stack spacing={2}>
                        <FormLabel style={{fontWeight: '700', fontSize: 16, color: 'common.black'}}>
                            Quiz Rules
                        </FormLabel>
                        <Stack direction={'row'} alignItems={'baseline'} spacing={2}>
                            <Typography sx={{width: 404}}>
                                Minimum number of creator points to submit a quiz
                            </Typography>
                            <TextField variant={"standard"} value={effectiveSettings.minCreatorPoints}
                                       onChange={(e) => {
                                           const value = Number(e.target.value);
                                           if (value >= 0) {
                                               setEffectiveSettings(prev => {
                                                   return {...prev, minCreatorPoints: value}
                                               })
                                           }
                                       }
                                       } style={{width: 60}} type={"number"}>
                            </TextField>
                        </Stack>
                        <FormControlLabel label="Only you can submit quizzes to this platform"
                                          labelPlacement={"start"} style={{
                            padding: 0,
                            marginLeft: 0,
                            width: 450,
                            justifyContent: "space-between"
                        }} control={<Checkbox value={effectiveSettings.onlyModSubmissions}
                                              onChange={(e) => {
                                                  setEffectiveSettings(prev => {
                                                      return {...prev, onlyModSubmissions: e.target.checked}
                                                  })
                                              }}/>}
                        />
                        {/*<LabelTextField label={"Required Creator Points"}*/}
                        {/*                value={effectiveSettings.minCreatorPoints}*/}
                        {/*                onChange={(e) => {*/}
                        {/*                    setEffectiveSettings(prev => {*/}
                        {/*                        return {...prev, minCreatorPoints: e.target.value}*/}
                        {/*                    })*/}
                        {/*                }}*/}
                        {/*                type={"number"}/>*/}
                        {/*<Box sx={{display: 'flex'}}>*/}
                        {/*    <FormControlLabel control={<Switch/>} label="Only allow current moderators to submit quizzes"/>*/}
                        {/*</Box>*/}
                        <Stack direction="row" spacing={3}>
                            <Button variant="contained" onClick={() => setPublishConfirmOpen(true)}>SAVE
                                CHANGES</Button>
                            <Button variant="outlined"
                                    onClick={() => history.push(`/platform/${platformName}`)}>CANCEL</Button>
                            <Button
                                variant={"contained"} style={{marginLeft: 150}} onClick={e => {
                                setDeletePlatformConfirmOpen(prev => !prev);
                            }}> DELETE PLATFORM </Button>
                        </Stack>
                    </Stack>
                </Stack> :
                <Box sx={{marginLeft: "100px", marginTop: "100px", display: loading ? "none" : ""}}>
                    You do not have access to this page.
                </Box>}
            <ConfirmationDialog
                open={publishConfirmOpen}
                handleClose={() => setPublishConfirmOpen(prev => !prev)}
                title='Confirm Changes'
                content={`Are you sure you want to save changes?`}
                yesText='CONFIRM'
                yesCallback={handleSubmit}
                noText='CANCEL'
                noCallback={() => setPublishConfirmOpen(prev => !prev)}
            />
            <ConfirmationDialog
                open={deletePlatformConfirmOpen}
                handleClose={() => setDeletePlatformConfirmOpen(prev => !prev)}
                title='Confirm Platform Deletion'
                content={`Are you sure you want to delete this platform?`}
                yesText='CONFIRM'
                yesCallback={()=>{
                    handleDeletePlatform();
                    setDeletePlatformConfirmOpen(prev => !prev);
                    history.push(`/user/${globalState()._id}/platforms`);
                }}
                noText='CANCEL'
                noCallback={() => setDeletePlatformConfirmOpen(prev => !prev)}
            />
            <LoadedModal
                open={loadedModalOpen}
                handleClose={() => setLoadedModalOpen(false)}
                title='Changes have been saved'
                content={`Changes have been saved`}
                yesText='CONFIRM'
                yesCallback={() => setLoadedModalOpen(false)}
                noCallback={() => setLoadedModalOpen(false)}
            />
        </>
    )
}
