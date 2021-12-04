import {useLocation} from 'react-router-dom'
import { Typography, Avatar, Stack, Box, Button, Divider } from '@mui/material';

export default function NoMatch() {
    let location = useLocation();
  
    return (
      <Stack>
        <Typography>
          No match for <code>{location.pathname}</code>
        </Typography>
      </Stack>
    );
  }