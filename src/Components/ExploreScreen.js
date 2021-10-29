import { Box, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { DECREMENT_NUMBER, INCREMENT_NUMBER, APPEND_NUMBER, DELETE_NUMBER } from '../Queries/mutations';
import { useMutation } from '@apollo/client';
import { globalState } from '../State/UserState';
import { useReactiveVar } from "@apollo/client";

export default function ExploreScreen() {
    const [increment] = useMutation(INCREMENT_NUMBER);
    const [decrement] = useMutation(DECREMENT_NUMBER);
    const [append] = useMutation(APPEND_NUMBER);
    const [deleteNum] = useMutation(DELETE_NUMBER);
    const user = useReactiveVar(globalState);

    const handleIncrement = async (index) => {
        if (user._id !== '') {
            const { data } = await increment({ variables: { _id: user._id, index: index } });
            if (data)
                globalState({
                    loggedin: true,
                    googleId: user.googleId,
                    numbers: data.incrementNumber,
                    _id: user._id,
                });
        }
    }
    const handleDecrement = async (index) => {
        if (user._id !== '') {
            const { data } = await decrement({ variables: { _id: user._id, index: index } });
            if (data)
                globalState({
                    loggedin: true,
                    googleId: user.googleId,
                    numbers: data.decrementNumber,
                    _id: user._id,
                });
        }
    }

    const handleDelete = async (index) => {
        if (user._id !== '') {
            const { data } = await deleteNum({ variables: { _id: user._id, index: index } });
            if (data)
                globalState({
                    loggedin: true,
                    googleId: user.googleId,
                    numbers: data.deleteNumber,
                    _id: user._id,
                });
        }
    }

    const handleAppend = async () => {
        if (user._id !== '') {
            const { data } = await append({ variables: { _id: user._id } });
            if (data)
                globalState({
                    loggedin: true,
                    googleId: user.googleId,
                    numbers: data.appendNumber,
                    _id: user._id,
                });
        }
    }
    console.log('Inside Explore');
    console.log(user);
    return (
        <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'center', height: '100vh', direction: 'column', spacing: 5, marginTop: 20, marginLeft: 50, marginRight: 50 }}>
            <Grid container justifyContent='start' direction='column' spacing={4}>
                {/* <Grid item xs={4} justifyContent='center'>
                    <Typography variant='h5'>{user.numbers == null ? 'Please log in to see the numbers' : user.numbers[0]}</Typography>
                </Grid>
                {user.loggedin ?
                    <Grid item xs={2}>
                        <Button variant="contained" sx={{ marginRight: 20 }} onClick={handleIncrement}>Increment</Button>
                        <Button variant="outlined" onClick={handleDecrement}>Decrement</Button>
                    </Grid> : <Grid></Grid>} */}
                <Grid item xs={4} direction='row-reverse' container >
                    <Button variant="contained" onClick={handleAppend}>Append Number</Button>
                </Grid>

                {user.loggedin ?
                    (user.numbers.map((number, index) => (
                        <Grid item key={index}>
                            <Card key={index} variant='outlined'  >
                                <CardContent>
                                    <Typography >{number}</Typography></CardContent>
                                <CardActions spacing={1}>
                                    <Button variant="contained" onClick={() => handleIncrement(index)}>Increment</Button>
                                    <Button variant="contained" onClick={() => handleDecrement(index)}>Decrement</Button>
                                    <Button variant="outlined" onClick={() => handleDelete(index)}>Delete</Button>
                                </CardActions>
                            </Card>
                            <Typography variant='h5' style={{ margin: 20 }}>{user.numbers.length === 0 ? 'You do not have any number at the moment' : ''}</Typography>
                        </Grid>
                    ))) : <Typography variant='h5'>{user.numbers == null ? 'Please log in to see the numbers' : user.numbers[0]}</Typography>}


            </Grid>
        </Box >
    );
}
