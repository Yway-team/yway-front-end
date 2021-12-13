import React from 'react'
import Box from '@mui/material/Box';
import { Stack, Grid, Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function FullLeaderboardRow({avatar, score, username, position}) {
    return (
        <>
            <Grid item xs={1} sx={{fontWeight: "bold"}}>
                    {position+1}
            </Grid>
            <Grid item xs={1} sx={{mt:"-5px"}}>
                <Avatar sx={{ height: 30, width: 30, }} src={avatar} />
            </Grid>
            <Grid item xs={6}>
                    {username}
            </Grid>
            <Grid item xs={4} sx={{color: "lightgray"}}>
                    {score}
            </Grid>
        </>
    )
}
