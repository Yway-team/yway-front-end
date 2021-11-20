import React, {useState} from 'react'
import { Stack, Box, Avatar, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import { ColorPicker } from '../components';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';

import usePrivilegedQuery from '../hooks/usePrivilegedQuery';
import { GET_PLATFORM_SUMMARY } from '../controllers/graphql/platform-queries';

import { LabelTextField } from '../components';

export default function PlatformSettings() {

    const { platformName } = useParams();
    // const { data: platformData } = usePrivilegedQuery(GET_PLATFORM_SETTINGS, { variables: { title: platformName } });
    // let platformSummary;
    // if (platformData) {
    //     platformSummary = platformData.getPlatformSummary;
    // }
    const tempData = {
        platformName:"test2",
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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const [tempPlatformName, setTempPlatformName] = useState(platformName)
    const [backgroundColor, setbackgroundColor] = useState(tempData.backgroundColor)
    const [bannerImage, setbannerImage] = useState(tempData.bannerImg)
    const [avatarImage, setavatarImage] = useState(tempData.thumbnailImg)
    const [creatorPoints, setcreatorPoints] = useState(tempData.minCreatorPoints)
    const [onlyModerators, setonlyModerators] = useState(tempData.onlyModSubmissions)

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack sx={style} spacing={3}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirmation
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to save changes?
                    </Typography>
                    <Stack direction="row" spacing={3}>
                        <Button variant="contained">Submit</Button>
                        <Button variant="contained">Cancel</Button>
                    </Stack>
                </Stack>
            </Modal>
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
                <h2 style={{color:"black", fontSize:"35px", marginLeft: "20px"}}>{tempData.platformName}</h2>

                <Box sx={{display:"flex", alignItems: 'flex-end', position:"absolute", left: "0px", bottom: "0px", width:"100%"}}>
                </Box>
            </div> 
            <Stack sx={{width: "100%", marginLeft: "4rem", marginTop: "4rem"}} spacing={4}>
                <Stack spacing={2}>
                    <h2>Platform Settings</h2>
                    <Stack direction="row" alignItems="baseline">
                        <div style={{paddingRight: "10px"}}>
                        Platform Names
                        </div>
                        <TextField size="small" id="platformName" variant="standard" value={tempPlatformName} onChange={(e)=>setTempPlatformName(e.target.value)}/>
                    </Stack>
                    <Box sx={{ display: 'flex' }}>
                        <div>
                        Platform Tags
                        </div>
                    </Box>
                </Stack>

                <Stack spacing={2}>
                    <h2>Platform Style</h2>
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                        <div>
                        Background Color
                        </div>
                        <div style={{marginLeft:"-230px"}}>
                            <ColorPicker/>
                        </div>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems:"center" }}>
                        <div style={{paddingRight: "10px"}}>
                        Banner Image
                        </div>
                        <TextField size="small" id="standard-basic" variant="standard" style={{position:"relative", top:"-5px"}} value={bannerImage} onChange={setbannerImage}/>
                    </Box>
                    <Box sx={{ display: 'flex',  alignItems:"center" }}>
                        <div style={{paddingRight: "10px"}}>
                        Avatar Image
                        </div>
                        <TextField size="small" id="standard-basic" variant="standard" style={{position:"relative", top:"-5px"}} value={avatarImage} onChange={setavatarImage}/>
                    </Box>
                </Stack>

                <Stack spacing={2}>
                    <h2>Quiz Rules</h2>
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
