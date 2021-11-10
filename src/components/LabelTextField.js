import { TextField, Typography } from "@mui/material";
import React from "react";
import Stack from "@mui/material/Stack";

function LabelTextField({ value, onBlur, label, onChange, variant, type, multiline, placeholder }) {
    return (
        <Stack direction={'row'} alignItems={'baseline'}>
            <Typography sx={{ width: 250 }}>
                {label}
            </Typography>
            <TextField value={value} onChange={onChange} placeholder={placeholder} onBlur={onBlur}
                variant={variant || 'standard'}
                style={{ width: 450 }} type={type || 'text'} multiline={multiline || false}>
            </TextField>
        </Stack>
    )
}

export default LabelTextField;