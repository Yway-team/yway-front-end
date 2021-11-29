import {IconButton, Stack, TextField, Typography} from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';
import {useState} from "react";

export default function ImageUpload({ label, onUpload }) {
    const [imageName, setImageName] = useState('');
    const [file, setFile] = useState(null);
    const [fileContents, setFileContents] = useState(null);

    const reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageName(file.name);
        setFile(file);
        reader.addEventListener('load', () => {
            setFileContents(reader.result);
            onUpload(label, reader.result);
        });
        reader.readAsDataURL(file);
        // pass the data in fileContents to the top level
    };


    return (
        <Stack direction={"row"} justifyItems={"baseline"}>
            <Typography style={{ width: 250 }}>
                {label}
            </Typography>
            <TextField style={{ width: 300 }} value={imageName} variant={"standard"} disabled={true}
                onChange={(e) => setImageName(e.target.value)}>
            </TextField>
            <label htmlFor="icon-button-file">
                <input accept="image/*" id="icon-button-file" type="file" style={{ display: 'none' }}
                    onChange={handleImageUpload} />
                <IconButton label={label} color="primary" aria-label="upload picture" component="span">
                    <IosShareIcon />
                </IconButton>
            </label>
        </Stack>
    );
}