import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import {Box, Typography} from '@mui/material';
import {useMutation, useReactiveVar} from '@apollo/client';
import {UPDATE_PRIVACY_SETTINGS} from '../controllers/graphql/user-mutations';
import {globalState} from "../state/UserState";

export default function ProfilePrivacy(props) {
    // When the privacy settings are confirmed, call updatePrivacySettings to perform the mutation.
    // This is untested and intended as a starting point for the implementer.
    let privacySettings = useReactiveVar(globalState).privacySettings || 'private';  // the new privacy settings should be in here
    const {userInfo} = props;  // passed from ProfileScreen
    const [updatePrivacySettings] = useMutation(UPDATE_PRIVACY_SETTINGS, {variables: {privacySettings: privacySettings}});
    const [value, setValue] = React.useState(userInfo.privacySettings);

    const handleSetPrivacy = async () => {
        privacySettings = value;
        const {data} = await updatePrivacySettings({variables: {privacySettings: privacySettings}});
        console.log(data.updatePrivacySettings);
        var newState = {...globalState()};
        newState.privacySettings = data.updatePrivacySettings;
        globalState(newState);
        console.log(newState);
        window.location.reload(false);
    }

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(value);
    }
    return (
        <Stack spacing={3} sx={{p: 5}}>
            <Typography variant='h5'>
                PRIVACY SETTINGS
            </Typography>
            <Box>
                <Typography>
                    Who is allowed to see your quizzes, platforms, achievements, and history?
                </Typography>
            </Box>
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="privacy"
                    name="radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="public" control={<Radio/>} label="Public (Anyone)"/>
                    <FormControlLabel value="friends" control={<Radio/>} label="Friends only"/>
                    <FormControlLabel value="private" control={<Radio/>} label="Private (Only You)"/>
                </RadioGroup>
            </FormControl>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleSetPrivacy}>CONFIRM</Button>
                <Button variant="outlined" onClick={props.handleClose}>CANCEL</Button>
            </Stack>
        </Stack>
    );
}