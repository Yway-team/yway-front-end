import { Box, Typography, Button, Grid } from '@mui/material';
import { DECREMENT_NUMBER, INCREMENT_NUMBER } from '../Queries/mutations';
import { useMutation } from '@apollo/client';
import { globalState } from '../State/UserState';
import { useReactiveVar } from "@apollo/client";

export default function ExploreScreen() {
    const [increment] = useMutation(INCREMENT_NUMBER);
    const [decrement] = useMutation(DECREMENT_NUMBER);
    const user = useReactiveVar(globalState);

    const handleIncrement = async () => {
        if (user._id !== '') {
            const newNumber = await increment({ variables: { _id: user._id } });
            globalState({
                loggedin: true,
                googleId: user.googleId,
                number: newNumber.data.incrementNumber,
                _id: user._id,
            });
        }
    }
    const handleDecrement = async () => {
        if (user._id !== '') {
            const newNumber = await decrement({ variables: { _id: user._id } });
            console.log(newNumber);
            globalState({
                loggedin: true,
                googleId: user.googleId,
                number: newNumber.data.decrementNumber,
                _id: user._id,
            });
        }
    }
    // console.log('Inside Explore');
    // console.log(user);
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', direction: 'column', spacing: 5, marginLeft: 50 }}>
            <Grid container justifyContent='center' spacing={4} direction='column'>
                <Grid item xs={4} justifyContent='center'>
                    <Typography variant='h5'>{user.number == null ? 'Please log in to see the number' : user.number}</Typography>
                </Grid>
                {user.loggedin ?
                    <Grid item xs={2}>
                        <Button variant="contained" sx={{ marginRight: 20 }} onClick={handleIncrement}>Increment</Button>
                        <Button variant="outlined" onClick={handleDecrement}>Decrement</Button>
                    </Grid> : <Grid></Grid>}
            </Grid>
        </Box >
    );
}
