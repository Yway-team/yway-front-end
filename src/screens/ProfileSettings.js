import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import {Box, TextField} from '@mui/material';
import {CommonTitle, ImageUpload} from "../components";
import {EDIT_PROFILE, UPDATE_BIO, UPDATE_USERNAME} from "../controllers/graphql/user-mutations";
import {useMutation, useReactiveVar} from "@apollo/client";
import {globalState} from "../state/UserState";


export default function ProfileSettings(props) {
    const {userInfo} = props;  // passed from ProfileScreen
    const bannerImgLabel = 'Banner Image';
    const avatarImgLabel = 'Avatar';
    const [username, setUsername] = useState(userInfo.username);
    const [bio, setBio] = useState(userInfo.bio);
    const [bannerImgName, setBannerImgName] = useState('');
    const [bannerImgData, setBannerImgData] = useState(null);
    const [avatarName, setAvatarName] = useState('');
    const [avatarData, setAvatarData] = useState(null);
    const [editProfile] = useMutation(EDIT_PROFILE, {variables: {username: username, bio: bio, avatarData: avatarData, bannerImgData: bannerImgData}});

    const handleImageUpload = (name, filename, data) => {
        if (name === bannerImgLabel) {
            setBannerImgData(data);
            setBannerImgName(filename);
        } else if (name === avatarImgLabel) {
            setAvatarData(data);
            setAvatarName(filename);
        } else {
            console.error(`ProfileSettings.handleImageUpload: argument 'name' must be one of '${bannerImgLabel}' or '${avatarImgLabel}'`)
        }
    };

    const handleRemoveImage = (name) => {
        if (name === bannerImgLabel) {
            setBannerImgData(null);
            setBannerImgName('');
        } else if (name === avatarImgLabel) {
            setAvatarData(null);
            setAvatarName('');
        } else {
            console.error(`ProfileSettings.handleRemoveImage: argument 'name' must be one of '${bannerImgLabel}' or '${avatarImgLabel}'`)
        }
    }

    const handleUpdateProfile = async () => {
        console.log(username);
        console.log(bio);
        console.log(avatarData);
            const {data} = await editProfile({variables: {username: username, bio: bio, avatarData: avatarData, bannerImgData: bannerImgData}});
            props.handleClose();
            window.location.reload(false);
    }

    return (
        <Stack spacing={3} sx={{px: 5, pb: 5}}>
            <CommonTitle title='EDIT PROFILE' sx={{spacing: 0}}/>
            <TextField label={"Username"} value={username} variant={"standard"}
                       onChange={e => setUsername(e.target.value)} fullWidth>
            </TextField>
            <TextField label={"Edit Bio"} value={bio} variant={"outlined"} fullWidth multiline
                       onChange={e => setBio(e.target.value)}>
            </TextField>
            <ImageUpload label={avatarImgLabel} onUpload={handleImageUpload} onRemove={handleRemoveImage}/>
            {/*<ImageUpload label={bannerImgLabel} onUpload={handleImageUpload} onRemove={handleRemoveImage}/>*/}
            <Stack direction={"row"} spacing={2}>
                <Button variant={"contained"} onClick={handleUpdateProfile}>CONFIRM</Button>
                <Button variant={"outlined"} onClick={props.handleClose}>CANCEL</Button>
            </Stack>
        </Stack>
    );
}