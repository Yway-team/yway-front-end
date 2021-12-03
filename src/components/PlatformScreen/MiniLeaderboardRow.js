import React from 'react'
import Box from '@mui/material/Box';
import { Stack, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function MiniLeaderboardRow({avatar, score, username, position}) {
    return (
        <>
            <Grid item xs={1}>
                <Typography sx={{fontWeight:"bold"}}>    
                    {position+1}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <img style={{height: "20px"}} src={avatar}/>
            </Grid>
            <Grid item xs={6}>
                <Typography>
                    {username}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography sx={{color:"lightgray"}}>
                    {score} pts
                </Typography>
            </Grid>
        </>
    )
}
