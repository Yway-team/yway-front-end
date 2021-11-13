import {
    Card,
    CardContent,
    Typography,
    CardActionArea,
    Grid,
    Box,
    Avatar,
    Button,
    CardActions
} from '@mui/material';
import logoIcon from '../images/logoIcon.svg';
import LinesEllipsis from 'react-lines-ellipsis';
import { FavoriteRounded } from '@mui/icons-material';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { FAVORITE_PLATFORM, UNFAVORITE_PLATFORM } from '../controllers/graphql/user-mutations';
import { useMutation, useReactiveVar } from '@apollo/client';
// import { useState } from 'react';
import { globalState } from '../state/UserState';
import { elementAcceptingRef } from '@mui/utils';
// import { useHistory } from 'react-router-dom';

// _id: ObjectId,
//title
//       profileImg: Binary data, 
//favorites: String,
// numQuizzes: Int,
// description: String,
// favorited: Int
//                                           



function PlatformCard({ _id, title, profileImage, favorites, numQuizzes, description }) {
    const history = useHistory();
    const favoritesList = (useReactiveVar(globalState)).favorites || [];
    const initFavorite = favoritesList.forEach(element => {
        console.log(element.title);
        console.log(title);
        if (element.title === title) {
            return true;
        };
    }) || false;

    console.log(initFavorite);
    const [favorite, setFavorite] = useState(initFavorite);
    const [favoritePlatform] = useMutation(FAVORITE_PLATFORM);
    const [unfavoritePlatform] = useMutation(UNFAVORITE_PLATFORM);


    const handleClickOpen = () => {
        console.log("route to platform page");
        history.push('/testplatform');
    };


    const handleFavoritePlatform = async () => {
        const { data } = await favoritePlatform({ variables: { platformId: _id } });
        if (data.favoritePlatform) {
            var newState = { ...globalState };
            newState.favorites = data.favoritePlatform;
            globalState(newState);
            setFavorite(true);
        }

    };

    const handleUnfavoritePlatform = async () => {
        const { data } = await unfavoritePlatform({ variables: { platformId: _id } });
        if (data.favoritePlatform) {
            var newState = { ...globalState };
            newState.favorites = data.favoritePlatform;
            globalState(newState);
            setFavorite(false);
        }
    }



    return (
        <Card sx={{ maxWidth: 600, elevation: 0, boxShadow: 'none', height: 130, m: 2, position: 'relative' }}>
            <CardActionArea onClick={handleClickOpen} >
                <CardContent sx={{ p: 1 }}>
                    <Grid container direction='row' justifyContent='flex-start' alignItems='center' spacing={0} >
                        <Grid xs={3} item>
                            <Avatar alt="creator-avatar" src={profileImage} sx={{ height: 100, width: 100 }} />
                        </Grid>
                        <Grid xs={9} item container direction='column' justifyContent='flex-start' alignItems='baseline' sx={{ height: 110 }} flexGrow={1}  >
                            <Grid xs={2} container item direction='row' alignItems='center' justifyContent='space-between'>
                                <Typography sx={{ fontSize: 16, fontWeight: 600 }}> {title} </Typography>

                            </Grid>
                            <Grid xs={2} sm={6} item container flexDirection='row' justifyContent='flex-start' alignItems='center' flexGrow={1} mt={2} spacing={0} >
                                <FavoriteRounded sx={{ fill: '#ff5a1d', height: 10, width: 10 }} />
                                <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600' }}> {favorites} favorites</Typography>
                                <img alt='logo Icon' src={logoIcon} style={{ height: 15, marginLeft: 20 }} />
                                <Typography sx={{ fontSize: 14, ml: 1, fontWeight: 500, color: 'grey.600' }}> {numQuizzes} quizzes</Typography>
                                <Box sx={{ fontSize: 14, fontWeight: 500, color: 'grey.600', fontFamily: "'Montserrat', sans-serif", width: 400, height: 40, mt: 0.5, overFlow: 'hidden', alignItems: 'flex-start' }}>
                                    <LinesEllipsis
                                        text={description}
                                        maxLine='2'
                                        ellipsis='...'
                                        trimRight
                                        basedOn='letters'
                                        component='p'
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    variant='contained'

                    onClick={favorite ? handleUnfavoritePlatform : handleFavoritePlatform}
                    sx={{
                        width: 120,
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        backgroundColor: favorite ? 'grey.200' : 'primary.main',
                        boxShadow: 'none',
                        height: 28,
                        px: 2,
                        m: 1,
                        color: favorite ? 'grey.500' : 'common.white',
                        "&:hover": {
                            boxShadow: 'none',
                            backgroundColor: 'primary.light',
                            color: 'primary.main',
                        }
                    }}
                > {favorite ? 'FAVORITED' : 'FAVORITE'}</Button>
            </CardActions>
        </Card >);
}

export default PlatformCard;