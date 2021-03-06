import {
    Card,
    CardContent,
    Typography,
    CardActionArea,
    Grid,
    Box,
    Avatar,
    Button
} from '@mui/material';
import logoIcon from '../images/logoIcon.svg';
import { FavoriteRounded } from '@mui/icons-material';
import { useHistory } from 'react-router';
// import { useState } from 'react';
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
    const history = useHistory();
    const handleClickOpen = () => {
        console.log("route to platform page");
        history.push('/testplatform');
    };

    return (
        <Card onClick={handleClickOpen} sx={{ maxWidth: 600, elevation: 0, boxShadow: 'none', height: 130, m: 2, position: 'relative' }}>

            <CardActionArea >
                <CardContent sx={{ p: 1 }}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='center' spacing={0} >
                        <Grid xs={3} item>
                            <Avatar alt="creator-avatar" src={profileImage} sx={{ height: 100, width: 100 }} />
                        </Grid>
                        <Grid xs={9} item container direction='column' justifyContent='flex-start' alignItems='baseline' sx={{ height: 100 }} flexGrow={1}  >
                            <Grid xs={2} container item direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography sx={{ fontSize: 16, fontWeight: 600 }}> {name} </Typography>

                            </Grid>
                            <Grid xs={2} sm={5} item container flexDirection='row' justifyContent='flex-start' alignItems='center' flexGrow={1} spacing={0}>
                                <Grid> </Grid>
                                <FavoriteRounded sx={{ fill: '#ff5a1d', height: 10, width: 10 }} />
                                <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600' }}> {favorites} favorites</Typography>
                                <img alt='logo Icon' src={logoIcon} style={{ height: 15, marginLeft: 20 }} />
                                <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600' }}> {numQuizzes} quizzes</Typography>
                                <Box sx={{ textOverflow: "elipsis", height: 40, width: 400, overflow: 'hidden', mt: '8px' }}> <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'grey.600' }}> {description}</Typography> </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <Button
                variant='contained'

                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    background: 'primary.main',
                    boxShadow: 'none',
                    height: 28,
                    px: 2,
                    m: 1,
                    color: 'common.white',
                    "&:hover": {
                        boxShadow: 'none',
                        backgroundColor: 'primary.light',
                        color: 'primary.main',
                    }
                }}
            > FAVORITE</Button>
        </Card >);
}

export default PlatformCard;