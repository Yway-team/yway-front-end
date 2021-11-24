import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import {Box, TextField} from '@mui/material';
import {CommonTitle, ImageUpload} from "../components";
import {UPDATE_BIO, UPDATE_USERNAME} from "../controllers/graphql/user-mutations";
import {useMutation, useReactiveVar} from "@apollo/client";
import {globalState} from "../state/UserState";


export default function ProfileSettings(props) {
    // When the privacy settings are confirmed, call updatePrivacySettings to perform the mutation.
    // This is untested and intended as a starting point for the implementer.
    let newBio = useReactiveVar(globalState).bio || '';  // the new privacy settings should be in here
    let newUsername = useReactiveVar(globalState).username || '';
    const {userInfo} = props;  // passed from ProfileScreen
    // const [value, setValue] = React.useState(newBio);

    const [username, setUsername] = useState(newUsername);
    const [bio, setBio] = useState(newBio ? newBio : userInfo.bio);
    const [updateUsername] = useMutation(UPDATE_USERNAME, {variables: {username: newUsername}});
    const [updateBio] = useMutation(UPDATE_BIO, {variables: {bio: newBio}});
    const [imageName, setImageName] = useState('');
    const [image, setImage] = useState(null);
    const [profileImageName, setProfileImageName] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleImageUpload = (e) => {
        setImageName(e.target.files[0].name);

        var file = e.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setImage([reader.result]);
        };
    }

    const handleProfileImageUpload = (e) => {
        setProfileImageName(e.target.files[0].name);

        var file = e.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setProfileImage(reader.result);
        };
    }

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

    const handleChangeProfileImage = () => {

    }

    const handleChangeBannerImage = () => {

    }

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
            {/*<ImageUpload label={"Banner Image"} handleImageUpload={e => handleImageUpload(e)} image={image} imageName={imageName}/>*/}
            {/*<ImageUpload label={"Thumbnail Image"} handleImageUpload={e => handleProfileImageUpload(e)} image={profileImage} imageName={profileImageName}/>*/}
            <Stack direction={"row"} spacing={2}>
                <Button variant={"contained"}>CONFIRM</Button>
                <Button variant={"outlined"} onClick={props.handleClose}>CANCEL</Button>
            </Stack>
            {/*<img width={"300px"} src={image}/>*/}
            {/*<img width={"300px"} src={profileImage}/>*/}
        </Stack>
    );
}