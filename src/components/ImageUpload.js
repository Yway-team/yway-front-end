import {IconButton, Stack, TextField, Typography} from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import CloseIcon from "@mui/icons-material/Close";
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

export default function ImageUpload({label}) {
    const [imageName, setImageName] = useState('');
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        setImageName(e.target.files[0].name);
        var file = e.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (test) {
            setImage(reader.result);
        };
    }

    const handleRemoveImage = (e) => {
        setImageName('');
        setImage(null);
    }

    const inputId = uuidv4()
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
                            <IconButton color='primary' onClick={handleRemoveImage}>
                                <CloseIcon/>
                            </IconButton>
                        </label>
                    </Stack>
                    <img width={'300px'} src={image}/>
                </Stack>

            </Stack>
        </>
    );
}