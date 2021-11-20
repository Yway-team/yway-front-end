import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Avatar, CardActionArea, Stack} from '@mui/material';

export default function FriendRequestCard({_id, name, avatar}) {
    return (
        <Card sx={{maxWidth: 400, boxShadow: 0}}>
            <CardActionArea>
                <Stack direction={"row"} spacing={2} padding={2}>
                    <Avatar alt="avatar" src={avatar}
                        sx={{
                        height: 60,
                        width: 60,
                        border: '0.2rem solid',
                        borderColor: 'common.white'
                    }}
                        imgProps={{ style: { borderRadius: '50%', objectFit: 'fill' } }} />
                    <Stack direction={"column"} spacing={2}>
                        <Typography>
                            {name} sent you a friend request.
                        </Typography>
                        <Typography>
                           3 hours ago
                        </Typography>
                    </Stack>
                </Stack>
            </CardActionArea>
        </Card>
    );
}
