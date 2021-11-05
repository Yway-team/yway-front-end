import { Card, CardContent, CardMedia, Typography, CardActionArea, Grid, Box, Avatar } from '@mui/material';
import logoIcon from '../images/logoIcon.svg';

import { useState } from 'react';
import { globalState } from '../state/UserState';
import { useHistory } from 'react-router-dom';

function QuizCard(props) {
    return (
        <Card sx={{ maxWidth: 300, elevation: 0, boxShadow: 'none', height: 300, m: 2 }}>
            <CardActionArea >
                <CardMedia
                    component="img"
                    height={130}
                    image="https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg"
                    alt="quiz image"
                    sx={{ borderRadius: '10px 10px 0px 0px' }}
                />
                <CardContent sx={{ py: 2, px: 1 }}>
                    <Box className={'quizCardBox'} sx={{
                        overflow: "hidden", textOverflow: "ellipsis", height: 52,
                        // 'display': '-webkit-box',
                        // '-webkit-line-clamp': 2, 'line-clamp': 2, '-webkit-box-orient': 'vertical'
                    }}>
                        <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'common.black' }}>
                            How much do you know your Chinese cuisine? how do
                        </Typography>
                    </Box>
                    <Grid container sx={{ mt: 1 }} justifyContent='space-between' spacing={1} >
                        <Grid item container xs={6} alignItems='center'>
                            <img src={logoIcon} style={{ height: 15 }} />
                            <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600' }}> 4.5 </Typography>
                        </Grid>
                        <Grid item xs={6} alignItems='center' justifyContent='flex-end'>
                            <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600', textAlign: 'right' }}> two months ago </Typography>
                        </Grid>
                        <Grid item container xs={6} alignItems='center'>
                            <Avatar alt="creator-avatar" src="https://i.pravatar.cc/300" sx={{ height: 14, width: 14 }} />
                            <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600' }}> yourmama101 </Typography>
                        </Grid>
                        <Grid item container xs={6} alignItems='center' justifyContent='flex-end'>
                            <Avatar alt="creator-avatar" src="https://i.pravatar.cc/300" sx={{ height: 14, width: 14 }} />
                            <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600', textAlign: 'right' }}> Mcdonalds </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card >
    );
}

export default QuizCard;