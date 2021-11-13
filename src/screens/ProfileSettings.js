import * as React from 'react';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import {Box, TextField} from '@mui/material';
import {CommonTitle, ImageUpload} from "../components";


// When the privacy settings are confirmed, call updatePrivacySettings to perform the mutation.
// This is untested and intended as a starting point for the implementer.
// let privacySettings = null;  // the new privacy settings should be in here
// const { userInfo } = props;  // passed from ProfileScreen
// const [updatePrivacySettings] = useMutation(UPDATE_PRIVACY_SETTINGS, { variables: { privacySettings: privacySettings } });


const handleChangeUsername = () => {

}

const handleChangeBio = () => {

}

const handleChangeProfileImage = () => {

}

const handleChangeBannerImage = () => {

}

export default function ProfileSettings(props) {
    return (
        <Stack spacing={3} sx={{p: 5}}>
            <CommonTitle title='EDIT PROFILE' sx={{spacing:0}}/>
            <TextField label={"Change Username"} variant={"standard"} fullWidth>
            </TextField>
            <Box>
                <Button variant="contained">CHANGE USERNAME</Button>
            </Box>
            <TextField label={"Edit Bio"} variant={"outlined"} fullWidth multiline>
            </TextField>
            <Box>
                <Button variant="contained">CONFIRM</Button>
            </Box>
            <ImageUpload label={"Banner Image"}/>
            <ImageUpload label={"Thumbnail Image"}/>
            <Stack direction={"row"} spacing={2}>
                <Button variant={"contained"}>CONFIRM</Button>
                <Button variant={"outlined"} onClick={props.handleClose} >CANCEL</Button>
            </Stack>
        </Stack>
    );
}