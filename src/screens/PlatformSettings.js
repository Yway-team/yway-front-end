import React from 'react'
import { Stack, Box, Avatar } from '@mui/material'

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
            <Stack sx={{width: "100%", marginLeft: "4rem", marginTop: "4rem"}}>
                <div>
                    Platform Settings
                </div>    
                <div>
                    Platform Details
                </div>    
                <div>
                    Platform Name
                </div>    
                <div>
                    Platform Tags
                </div>
            </Stack>
        </>
    )
}
