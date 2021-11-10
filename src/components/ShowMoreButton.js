import { Button, Grid, Typography } from '@mui/material';
import { ExpandMoreRounded, ExpandLessRounded } from '@mui/icons-material';

const sxShared = {
    fill: '#ff5a1d', fontSize: 14, fontWeight: 600
};
export default function ShowMoreButton({ expand, onClick }) {
    return (
        <Grid container justifyContent='flex-start' sx={{ width: '100%' }}>
            <Button variant='text'
                onClick={onClick}
                startIcon={expand ? <ExpandLessRounded sx={sxShared} /> : <ExpandMoreRounded sx={sxShared} />} >
                <Typography fontSize={14} fontWeight={600} px={1}>  {expand ? 'Show Less' : 'Show More'}</Typography>
            </Button>
        </Grid>
    );
}