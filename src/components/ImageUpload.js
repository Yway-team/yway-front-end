import {IconButton, Stack, TextField, Typography} from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import CloseIcon from "@mui/icons-material/Close";
import {Fragment, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {default as Compress} from "compress.js";
import {quizDetailsVar} from "../screens/CreateQuizScreen";

export default function ImageUpload({label, onUpload, onRemove, savedImg}) {
    const [imageName, setImageName] = useState('');
    const [image, setImage] = useState(savedImg ? savedImg : null);

    const handleImageUpload = (e) => {
        const compress = new Compress();
        const file = e.target.files[0];
        if (file) {
            compress.compress([file], {
                size: 3.5, // the max size in MB, defaults to 2MB
                quality: 1, // the quality of the image, max is 1,
                maxWidth: 1920, // the max width of the output image, defaults to 1920px
                maxHeight: 1920, // the max height of the output image, defaults to 1920px
                resize: true, // defaults to true, set false if you do not want to resize the image width and height
                rotate: false, // See the rotation section below
            }).then((data) => {
                console.log(data[0]);
                const reader = new FileReader();
                setImageName(file.name);
                reader.addEventListener('load', () => {
                    const imgData = reader.result;
                    setImage(imgData);
                    onUpload(label, file.name, imgData);
                });
                reader.readAsDataURL(Compress.convertBase64ToFile(data[0].data, data[0].ext));
            })
        }
        // pass the data in fileContents to the top level
    };

    const handleRemoveImage = (e) => {
        onRemove(label);
        setImageName('');
        setImage(null);
    }

    const inputId = uuidv4();
    return (
        <>
            <Stack direction={'row'} justifyItems={'baseline'}>
                <Typography style={{width: 250}}>
                    {label}
                </Typography>
                <Stack direction={'column'}>
                    <Stack direction={'row'} justifyItems={'baseline'}>
                        <TextField style={{width: 350}} value={imageName} variant={'standard'} disabled={true}
                                   onChange={(e) => setImageName(e.target.value)}>
                        </TextField>
                        <label htmlFor={inputId}>
                            <input accept='image/*' id={inputId} type='file' style={{display: 'none'}}
                                   onChange={handleImageUpload}/>
                            <IconButton label={'Banner Image'} color='primary' aria-label='upload picture'
                                        component='span'>
                                <IosShareIcon/>
                            </IconButton>
                        </label>
                        {image ?
                            <IconButton color='primary' onClick={handleRemoveImage}>
                                <CloseIcon/>
                            </IconButton> : <Fragment/>}
                    </Stack>
                    <img width={'300px'} src={image} alt=''/>
                </Stack>
            </Stack>
        </>
    );
}