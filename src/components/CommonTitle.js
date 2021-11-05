import { Typography, Grid } from "@mui/material";

function CommonTitle({ title }) {
    return (
        <Grid xs={12}>
            <Typography sx={{
                fontWeight: '700',
                fontSize: 16,
                color: 'common.black',
                my: 4,
                ml: 2,
            }
            }> {title}</Typography >
        </Grid >
    )
}
export default CommonTitle;