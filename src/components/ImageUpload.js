import {IconButton, Stack, TextField, Typography} from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';
import {useState} from "react";
import {useTheme} from "@emotion/react";

export default function ImageUpload({label}) {
    const [imageName, setImageName] = useState('');
    const [file, setFile] = useState(null);

    const handleImageUpload = (e) => {
        // if (e.target.files.length > 0) {
            setImageName(e.target.files[0].name)
        // }
    }


    return (
        <Stack direction={"row"} justifyItems={"baseline"}>
            <Typography style={{width: 250}}>
                {label}
            </Typography>
            <TextField  style={{width: 300}} value={imageName} variant={"standard"} disabled={true}
                       onChange={(e) => setImageName(e.target.value)}>
            </TextField>
            <label htmlFor="icon-button-file">
                <input accept="image/*" id="icon-button-file" type="file" style={{display: 'none'}}
                       onChange={handleImageUpload}/>
                <IconButton label={"Banner Image"} color="primary" aria-label="upload picture" component="span">
                    <IosShareIcon/>
                </IconButton>
            </label>
        </Stack>
    );
}