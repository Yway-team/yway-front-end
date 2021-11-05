import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActionArea,
    Grid,
    Box,
    Avatar,
    Dialog,
    Button
} from '@mui/material';
import logoIcon from '../images/logoIcon.svg';
import { FavoriteRounded } from '@mui/icons-material';
import { useState } from 'react';
// import { globalState } from '../state/UserState';
// import { useHistory } from 'react-router-dom';

// _id: ObjectId,
//name
//       profileImg: Binary data, 
//favorites: String,
// numQuizzes: Int,
// description: String,
// favorited: Int
//                                           



function PlatformCard({ _id, name, profileImage, favorites, numQuizzes, description, favorited }) {
    const handleClickOpen = () => {
        console.log("route to platform page");
    };

    return (
        <Card onClick={handleClickOpen} sx={{ maxWidth: 600, elevation: 0, boxShadow: 'none', height: 130, m: 2 }}>
            <CardActionArea >
                <CardContent sx={{ py: 2, px: 2 }}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='center' spacing={1} >
                        <Grid xs={3}>
                            <Avatar alt="creator-avatar" src={profileImage} sx={{ height: 100, width: 100 }} />
                        </Grid>
                        <Grid xs={9} item container direction='column' justifyContent='flex-start' alignItems='baseline' sx={{ height: 100 }} flexGrow={1}  >
                            <Grid xs={2} container item direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography sx={{ fontSize: 16, fontWeight: 600 }}> {name} </Typography>
                                <Button
                                    variant='contained'
                                    sx={{
                                        background: 'primary.main',
                                        boxShadow: 'none',
                                        height: 28,
                                        px: 2,
                                        color: 'common.white',
                                        "&:hover": {
                                            boxShadow: 'none',
                                            backgroundColor: 'primary.light',
                                            color: 'primary.main',
                                        }
                                    }}
                                > FAVORITE</Button>
                            </Grid>
                            <Grid xs={2} sm={5} item container flexDirection='row' justifyContent='flex-start' alignItems='center' flexGrow={1} spacing={0}>
                                <FavoriteRounded sx={{ fill: '#ff5a1d', height: 10, width: 10 }} />
                                <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600' }}> {favorites} favorites</Typography>
                                <img src={logoIcon} style={{ height: 15, marginLeft: 20 }} />
                                <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600' }}> {numQuizzes} quizzes</Typography>

                            </Grid>
                            <Grid xs={10} sm={10} item >   <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'grey.600' }}> {description}</Typography> </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card >);
}

export default PlatformCard;