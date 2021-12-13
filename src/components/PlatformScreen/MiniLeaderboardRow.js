import React from 'react'
import { Stack, Grid, Avatar } from '@mui/material';

export default function MiniLeaderboardRow({ avatar, score, username, position }) {
    return (
        <Grid container alignItems='center' xs={12} spacing={0} ml={2} mb={2} >
            <Grid item xs={1} sx={{ fontWeight: "bold" }}>
                {position + 1}
            </Grid>
            <Grid item xs={2} >
                <Avatar sx={{ height: 30, width: 30 }} src={avatar} />
            </Grid>
            <Grid item xs={5} >
                {username}
            </Grid>
            <Grid item xs={4} sx={{ color: "lightgray" }}>
                {score}
            </Grid>
        </Grid>
    )
}
