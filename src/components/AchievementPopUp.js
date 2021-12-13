import { Dialog, Avatar, Stack, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router';
import { globalState } from '../state/UserState';
import { useReactiveVar } from '@apollo/client';

export default function AchievementPopUp({ icon, name, description, open, handleClose, beforeCheckItOut }) {
    const history = useHistory();
    const user = useReactiveVar(globalState);
    return (
        <Dialog open={open} onClose={handleClose}
            aria-labelledby="quiz-details-dialog" sx={{ backgroundColor: 'transparent' }} >
            <Stack sx={{ width: 350, height: 400, p: 4, px: 6 }} alignItems='center'>
                <Typography sx={{ fontSize: 20, fontWeight: 700, color: 'primary.black' }}> Congraulations!  </Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'grey.500' }}> You just won a new achievement.   </Typography>
                <Avatar src={icon} sx={{ height: 100, width: 100, mt: 8, mb: 2 }} />
                <Typography sx={{ fontSize: 20, fontWeight: 700, color: 'primary.main' }}> {name}</Typography>
                <Typography textAlign='center' sx={{ fontSize: 14, fontWeight: 500, color: 'grey.500', mt: 1 }}> {description}   </Typography>
                <Button variant='contained' sx={{ mt: 7 }}
                    onClick={() => {
                        beforeCheckItOut();
                        history.push(`/user/${user._id}/achievements`);
                    }}
                > CHECK IT OUT</Button>
            </Stack>
        </Dialog >);
}