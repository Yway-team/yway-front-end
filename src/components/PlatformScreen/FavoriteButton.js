import React from 'react'
import { Grid, Stack, Avatar, Box, Button, CircularProgress } from '@mui/material'
import { FAVORITE_PLATFORM, UNFAVORITE_PLATFORM } from '../../controllers/graphql/user-mutations';
import { useMutation, useReactiveVar } from '@apollo/client';
import { globalState } from '../../state/UserState';

export default function FavoriteButton({ _id, sx, title }) {
    const [favoritePlatform] = useMutation(FAVORITE_PLATFORM);
    const [unfavoritePlatform] = useMutation(UNFAVORITE_PLATFORM);
    const favoritesList = useReactiveVar(globalState).favorites || [];
    const favorite = initFavorite(favoritesList);

    function initFavorite(favListIn) {
        for (var element of favListIn) {
            if (element.title === title) {
                return true;
            }
        }
        return false;
    }
    const handleFavoritePlatform = async () => {
        const { data } = await favoritePlatform({ variables: { platformId: _id } });
        if (data.favoritePlatform) {
            var newState = { ...globalState() };
            console.log(newState);
            newState.favorites = data.favoritePlatform;
            globalState(newState);
            console.log(globalState());
        }
    };

    const handleUnfavoritePlatform = async () => {
        const { data } = await unfavoritePlatform({ variables: { platformId: _id } });
        if (data.unfavoritePlatform) {
            var newState = { ...globalState() };
            newState.favorites = data.unfavoritePlatform;
            globalState(newState);
            console.log(globalState());
        }
    }

    return (
        <Button
            variant='contained'
            onClick={favorite ? handleUnfavoritePlatform : handleFavoritePlatform}
            sx={{
                ...sx,
                width: 120,
                backgroundColor: favorite ? 'grey.200' : 'primary.main',
                boxShadow: 'none',
                height: 28,
                px: 2,
                color: favorite ? 'grey.500' : 'common.white',
                "&:hover": {
                    boxShadow: 'none',
                    backgroundColor: 'primary.light',
                    color: 'primary.main',
                }
            }}
        > {favorite ? 'FAVORITED' : 'FAVORITE'}</Button>
    )
}
