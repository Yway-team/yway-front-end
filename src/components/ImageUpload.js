import {IconButton, Stack, TextField, Typography} from "@mui/material";
import IosShareIcon from '@mui/icons-material/IosShare';
import {useState} from "react";

export default function ImageUpload({label}) {
    const [imageName, setImageName] = useState('');
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        setImageName(e.target.files[0].name);

        var file = e.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setImage(reader.result);
        };
    }


    return (
        <>
            <Stack direction={"row"} justifyItems={"baseline"}>
                <Typography style={{width: 250}}>
                    {label}
                </Typography>
                <Stack direction={"column"}>
                    <Stack direction={"row"} justifyItems={"baseline"}>
                        <TextField style={{width: 350}} value={imageName} variant={"standard"} disabled={true}
                                   onChange={(e) => setImageName(e.target.value)}>
                        </TextField>
                        <label htmlFor="icon-button-file">
                            <input accept="image/*" id="icon-button-file" type="file" style={{display: 'none'}}
                                   onChange={handleImageUpload}/>
                            <IconButton label={"Banner Image"} color="primary" aria-label="upload picture"
                                        component="span">
                                <IosShareIcon/>
                            </IconButton>
                        </label>
                    </Stack>
                    <img width={"300px"} src={image}/>
                </Stack>
            </Stack>
        </>
    );
}