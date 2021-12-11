import React, {useState, useEffect} from 'react'
import { Grid, Avatar, Typography, Stack, LinearProgress, ButtonBase, Slide, Dialog, Button } from '@mui/material';

export default function Timer({timeLeft, handleTimeOut, timerOnOff}) {
    const [timeProgress, setTimeProgress] = useState(0);
    var timeLimit = 20 * 1000;

    useEffect(() => {
        var timer;
        if (timerOnOff) {
            timer = setInterval(() => {
                timeLeft.current -= 1000
                if (timeLeft.current <= 0){
                    console.log('Time is up');
                    handleTimeOut();
                }
                setTimeProgress(prev=>prev+1)
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <LinearProgress variant="determinate" value={Math.round((timeLeft.current / timeLimit) * 100)} color='inherit' sx={{
            height: 12,
            [`& .MuiLinearProgress-bar`]: {
                borderRadius: 2,
            },
        }} />
    )
}
