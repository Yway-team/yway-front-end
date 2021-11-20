import React from 'react'
import { Stack, Box, Avatar } from '@mui/material'
import TextField from '@mui/material/TextField';
import { ColorPicker } from '../components';

export default function PlatformSettings() {
    return (
        <>
            <div style={{height: "200px", position:"relative", display: "flex", alignItems: "center"}}>
                <div style={{height: "100%",width: "100%", overflow:"hidden", position: "absolute", top:"0px", zIndex: "-1"}}>
                    <img style={{width: "100%"}} alt='cover' src="https://picsum.photos/1000" />
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
                <h2 style={{color:"black", fontSize:"35px", marginLeft: "10px"}}>All About Mountaineering</h2>

                <Box sx={{display:"flex", alignItems: 'flex-end', position:"absolute", left: "0px", bottom: "0px", width:"100%"}}>
                </Box>
            </div> 
            <Stack sx={{width: "100%", marginLeft: "4rem", marginTop: "4rem"}} spacing={4}>
                <Stack spacing={2}>
                    <h2>Platform Settings</h2>
                    <Box sx={{ display: 'flex', alignItems: "center", textAlign:"center", alignContent:"center", position:"relative"}}>
                        <div style={{paddingRight: "10px"}}>
                        Platform Name
                        </div>
                        <TextField size="small" id="standard-basic" label="Standard" variant="standard" style={{textAlign: 'center', position:"relative", top:"-5px"}}/>
                    </Box>
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
                        <TextField size="small" id="standard-basic" label="Standard" variant="standard" style={{position:"relative", top:"-5px"}}/>
                    </Box>
                    <Box sx={{ display: 'flex',  alignItems:"center" }}>
                        <div style={{paddingRight: "10px"}}>
                        Avatar Image
                        </div>
                        <TextField size="small" id="standard-basic" label="Standard" variant="standard" style={{position:"relative", top:"-5px"}}/>
                    </Box>
                </Stack>

                <Stack spacing={2}>
                    <h2>Platform Settings</h2>
                    <div>Platform Details</div>
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                        <div>
                        Platform Name
                        </div>
                        <TextField id="standard-basic" label="Standard" variant="standard" />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <div>
                        Platform Tags
                        </div>
                    </Box>
                </Stack>

                <Stack spacing={2}>
                    <h2>Platform Settings</h2>
                    <div>Platform Details</div>
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                        <div>
                        Platform Name
                        </div>
                        <TextField id="standard-basic" label="Standard" variant="standard" />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <div>
                        Platform Tags
                        </div>
                    </Box>
                </Stack>

                <Stack spacing={2}>
                    <h2>Platform Settings</h2>
                    <div>Platform Details</div>
                    <Box sx={{ display: 'flex', alignItems: "center" }}>
                        <div>
                        Platform Name
                        </div>
                        <TextField id="standard-basic" label="Standard" variant="standard" />
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <div>
                        Platform Tags
                        </div>
                    </Box>
                </Stack>

                <h2>Quiz Rules</h2>
                <div>Platform Details</div>
                <div>Platform Name</div>
                <div>Platform Tags</div>

                <h2>Platform Moderators</h2>
                <div>Platform Details</div>
                <div>Platform Name</div>
                <div>Platform Tags</div>

                <h2>Banned Users</h2>
                <div>Platform Details</div>
                <div>Platform Name</div>
                <div>Platform Tags</div>
            </Stack>
        </>
    )
}
