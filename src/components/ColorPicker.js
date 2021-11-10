import {Button, Dialog, Typography} from "@mui/material";
import React, {useState} from "react";
import Stack from "@mui/material/Stack";
import {ChromePicker} from 'react-color';
import {useTheme} from "@emotion/react";


function ColorPicker({}) {
    const theme = useTheme();
    const [open, setOpen] = useState(false)
    const [quizColor, setQuizColor] = useState(theme.palette.primary)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleSetColor = (color) => {
        setQuizColor(color.hex);
    }

    return (
        <Stack direction={'row'} alignItems={'baseline'}>
            <Typography sx={{width: 250}}>
                Color Style
            </Typography>
            <Button onClick={handleClickOpen} variant={"contained"}
                    sx={{
                        borderRadius: 0.5,
                        padding: 0,
                        maxWidth: 18,
                        maxHeight: 18,
                        minWidth: 18,
                        minHeight: 18,
                        backgroundColor: quizColor
                    }}/>
            <Dialog open={open} onClose={handleClose}>
                <ChromePicker color={quizColor}
                              onChangeComplete={(color) => handleSetColor(color)}/>
            </Dialog>
        </Stack>
    )
}

export default ColorPicker;