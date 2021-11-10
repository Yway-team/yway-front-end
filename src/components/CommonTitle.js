import { Typography, Grid } from "@mui/material";

function CommonTitle({ title }) {
    return (
        <Grid sx={{ width: '100%' }}>
            <Typography sx={{
                fontWeight: '700',
                fontSize: 16,
                color: 'common.black',
                mt: 4,
                mb: 2,
            }
            }> {title}</Typography >
        </Grid >
    )
}
export default CommonTitle;