import {
    Card,
    CardContent,
    Typography,
    Avatar,
    CardActionArea,
    Stack
} from '@mui/material';
// import { useHistory } from 'react-router-dom';


function FriendCard({ _id, avatar, name }) {
    return (
        <Card sx={{
            width: 200, elevation: 0, boxShadow: 'none', height: 140, mr: 2, my: 2,
        }}>
            <CardActionArea>
                <CardContent sx={{ p: 1 }}>
                    <Stack justifyContent='center' alignItems='center'>
                        <Avatar alt="friend-avatar" src={avatar} sx={{ height: 80, width: 80 }} />
                        <Typography sx={{ fontSize: 16, fontWeight: 600, my: 2 }}> {name}  </Typography>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card >);
}

export default FriendCard;

