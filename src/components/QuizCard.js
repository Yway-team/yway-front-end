import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Grid} from '@mui/material';
import {useState} from 'react';
import {globalState} from '../state/UserState';
import {useHistory} from 'react-router-dom';


function QuizCard(props) {
    return (
        <Card sx={{maxWidth: 345}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://images.pexels.com/photos/858115/pexels-photo-858115.jpeg"
                    alt="quiz image"
                />
                <CardContent>
                    <Typography gutterBottom variant='body1'>
                        How much do you know your Chinese cuisine?
                    </Typography>
                    <Grid container>
                        <Grid item>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default QuizCard;