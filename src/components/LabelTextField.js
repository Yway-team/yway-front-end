import {TextField, Typography} from "@mui/material";
import React from "react";
import Stack from "@mui/material/Stack";

function LabelTextField({value, label, onChange, variant, type}) {
    return (
        <Stack direction={'row'} alignItems={'center'}>
            <Typography sx={{width: 200}}>
                {label}
            </Typography>
            <TextField label={label}
                       value={value}
                       onChange={onChange}
                       variant={variant || 'standard'}
                       style={{width: 350}}
                       type={type || 'text'}>
            </TextField>
        </Stack>
    )
}

export default LabelTextField;