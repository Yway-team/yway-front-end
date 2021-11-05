import React from 'react'
import { Grid, Stack, Avatar, Box }  from '@mui/material'
import MiniLeaderboard from '../components/PlatformScreen/MiniLeaderboard'

export default function PlatformScreen() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <div style={{height: "300px", position:"relative", display: "flex", alignItems: "flex-end"}}>
                    <div style={{height: "100%",width: "100%", overflow:"hidden", position: "absolute", top:"0px", zIndex: "-1"}}>
                        <img style={{width: "100%"}} alt='cover' src="https://picsum.photos/1000" />
                    </div>
                    <Avatar alt="avatar" src="https://i.pravatar.cc/300"
                            sx={{
                            height: 250,
                            width: 250,
                            border: '0.2rem solid',
                            borderColor: 'common.white',
                            marginLeft: "5%",
                            display: "relative",
                            bottom: "-30%"
                            }}
                            imgProps={{ style: { borderRadius: '50%' } }} />
                    <h2 style={{color:"black", fontSize:"50px"}}>All About Mountaineering</h2>

                    <Box sx={{display:"flex", alignItems: 'flex-end', position:"absolute", left: "0px", bottom: "0px", width:"100%"}}>
                    </Box>
                </div>
                <div style={{backgroundColor:"#ededed"}}>
                    <Stack sx={{padding: "2rem", marginLeft: "35%"}} direction="row" spacing={5}>
                        <div style={{whiteSpace: "nowrap"}}>1.35 Million Followers</div>
                        <div style={{whiteSpace: "nowrap"}}>234 Quizzes</div>
                        <div style={{whiteSpace: "nowrap"}}>2349 Questions</div>
                    </Stack>
                </div>
            </Grid>
            <Grid item xs={12}>
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                    <Box gridColumn="span 8" sx={{display:"flex", paddingLeft: "5rem", paddingTop: "3rem"}}>
                        <h2>No Quizzes to Display</h2>
                    </Box>
                    <Box gridColumn="-1" gridRow="1" style={{paddingTop:"2rem"}}>
                        <Grid item sx={{display:"flex", justifyContent:"center", paddingTop:"20px", height: "400px"}}>
                            <MiniLeaderboard width="350px"/>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}
