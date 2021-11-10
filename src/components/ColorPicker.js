import {Button, Dialog, Typography} from "@mui/material";
import React, {useState} from "react";
import Stack from "@mui/material/Stack";
import {ChromePicker} from 'react-color';
import {useTheme} from "@emotion/react";


function ColorPicker({label, colorState, onChangeComplete}) {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Stack direction={'row'} alignItems={'baseline'}>
            <Typography sx={{width: 250}}>
                {label}
            </Typography>
            <Button onClick={handleClickOpen} variant={"contained"}
                    sx={{
                        borderRadius: 0.5,
                        padding: 0,
                        maxWidth: 18,
                        maxHeight: 18,
                        minWidth: 18,
                        minHeight: 18,
                        backgroundColor: colorState
                    }}/>
            <Dialog open={open} onClose={handleClose}>
                <ChromePicker color={colorState}
                              onChangeComplete={onChangeComplete}/>
            </Dialog>
        </Stack>
    )
}

export default ColorPicker;