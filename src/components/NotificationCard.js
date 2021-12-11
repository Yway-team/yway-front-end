import * as React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, Stack } from '@mui/material';
import TimeAgoFromNow from './TimeAgoFromNow';
import { useHistory } from 'react-router-dom';

export default function NotificationCard({ _id, type, name, icon, createdAt }) {
    const history = useHistory();
    return (
        <Card sx={{ maxWidth: 400, boxShadow: 0 }} onClick={() => {
            if (type === 'friend request') {
                history.push(`user/${_id}`);
            }
        }}>
            <CardActionArea>
                <Stack direction={"row"} spacing={1} padding={2}>
                    <Avatar alt="icon" src={icon}
                        sx={{
                            height: 60,
                            width: 60,
                            border: '0.2rem solid',
                            borderColor: 'common.white'
                        }}
                        imgProps={{ style: { borderRadius: '50%', objectFit: 'fill' } }} />
                    <Stack direction={"column"} spacing={1}>
                        {
                            type === 'friend request' ?
                                <Typography>
                                    <span style={{ fontSize: 'Montserrat', fontWeight: '600' }} >  {name}   </span> sent you a friend request.
                                </Typography> : null
                        }
                        <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'primary.main', textAlign: 'left', mt: 1 }}><TimeAgoFromNow dateIn={createdAt} /> </Typography>
                    </Stack>
                </Stack>
            </CardActionArea>
        </Card>
    );
}
