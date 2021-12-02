import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, Stack } from '@mui/material';
import TimeAgoFromNow from './TimeAgoFromNow';

export default function NotificationCard({ _id, type, name, avatar, createdAt }) {
    return (
        <Card sx={{ maxWidth: 400, boxShadow: 0 }}>
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
                        {
                            type === 'friendRequest' ?
                                <Typography>
                                    {name} sent you a friend request.
                                </Typography> : null
                        }
                        <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'primary.main', textAlign: 'left', mt: 2 }}> <TimeAgoFromNow dateIn={createdAt} /> </Typography>
                    </Stack>
                </Stack>
            </CardActionArea>
        </Card>
    );
}
