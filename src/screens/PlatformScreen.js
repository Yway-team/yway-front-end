import React from 'react'
import { Grid, Stack, Avatar, Box }  from '@mui/material'

export default function PlatformScreen() {
    return (
        <Grid>
            <Grid item xs={12}>
                <div style={{height: "300px", position:"relative"}}>
                    <div style={{height: "100%",width: "100%", overflow:"hidden"}}>
                        <img style={{width: "100%"}} alt='cover' src="https://picsum.photos/1000" />
                    </div>
                    <Box sx={{position:"absolute", left: "0px", bottom: "0px", width:"100%", backgroundColor:"#0000008B"}}>
                        <Avatar alt="avatar" src="https://i.pravatar.cc/300"
                            sx={{
                            height: 250,
                            width: 250,
                            border: '0.2rem solid',
                            borderColor: 'common.white',
                            }}
                            imgProps={{ style: { borderRadius: '50%' } }} />
                        <h2 style={{color:"black", fontSize:"50px"}}>All About Mountaineering</h2>
                    </Box>
                </div>
                <div style={{backgroundColor:"gray"}}>
                    <Stack sx={{padding: "50px"}}>
                        <div>Testing</div>

                    </Stack>
                </div>
            </Grid>
        </Grid>
    )
}
