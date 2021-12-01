import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import {Box, TextField} from '@mui/material';
import {CommonTitle, ImageUpload} from "../components";
import {UPDATE_BIO, UPDATE_USERNAME} from "../controllers/graphql/user-mutations";
import {useMutation, useReactiveVar} from "@apollo/client";
import {globalState} from "../state/UserState";
import {quizDetailsVar} from "./CreateQuizScreen";


export default function ProfileSettings(props) {
    let newBio = useReactiveVar(globalState).bio || '';
    let newUsername = useReactiveVar(globalState).username || '';
    const {userInfo} = props;  // passed from ProfileScreen
    const bannerImgLabel = 'Banner Image';
    const thumbnailImgLabel = 'Profile Image';
    const [username, setUsername] = useState(newUsername);
    const [bio, setBio] = useState(newBio);
    const [updateUsername] = useMutation(UPDATE_USERNAME, {variables: {username: newUsername}});
    const [updateBio] = useMutation(UPDATE_BIO, {variables: {bio: newBio}});
    const [bannerImageName, setBannerImageName] = useState('');
    const [bannerImage, setBannerImage] = useState(null);
    const [profileImageName, setProfileImageName] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleChangeUsername = async () => {
        newUsername = username;
        const {data} = await updateUsername({variables: {username: newUsername}});
        var newState = {...globalState()};
        newState.username = data.updateUsername;
        globalState(newState);
        window.location.reload(false);
    }

    const handleChangeBio = async () => {
        newBio = bio;
        const {data} = await updateBio({variables: {bio: newBio}});
        var newState = {...globalState()};
        newState.bio = data.updateBio;
        globalState(newState);
        window.location.reload(false);
    }

    const handleImageUpload = (name, filename, data) => {
        if (name === bannerImgLabel) {
            setBannerImage(data);
            setBannerImage(filename);
        } else if (name === thumbnailImgLabel) {
            setProfileImage(data);
            setProfileImage(filename);
        } else {
            console.error(`CreateQuizForms.handleImageUpload: argument 'name' must be one of '${bannerImgLabel}' or '${thumbnailImgLabel}'`)
        }
    };

    return (
        <Stack spacing={3} sx={{px: 5, pb: 5}}>
            <CommonTitle title='EDIT PROFILE' sx={{spacing: 0}}/>
            <TextField label={"Change Username"} value={username} variant={"standard"}
                       onChange={e => setUsername(e.target.value)} fullWidth>
            </TextField>
            <Box>
                <Button variant="contained" onClick={handleChangeUsername}>CHANGE USERNAME</Button>
            </Box>
            <TextField label={"Edit Bio"} value={bio} variant={"outlined"} fullWidth multiline
                       onChange={e => setBio(e.target.value)}>
            </TextField>
            <Box>
                <Button variant="contained" onClick={handleChangeBio}>CONFIRM</Button>
            </Box>
            <ImageUpload label={bannerImgLabel} onUpload={handleImageUpload}/>
            <ImageUpload label={thumbnailImgLabel} onUpload={handleImageUpload}/>
            <Stack direction={"row"} spacing={2}>
                <Button variant={"contained"}>CONFIRM</Button>
                <Button variant={"outlined"} onClick={props.handleClose}>CANCEL</Button>
            </Stack>
        </Stack>
    );
}