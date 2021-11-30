import {IconButton, Stack, TextField, Typography} from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import CloseIcon from "@mui/icons-material/Close";
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

export default function ImageUpload({ label, onUpload }) {
    const [imageName, setImageName] = useState('');
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            setImageName(file.name);
            reader.addEventListener('load', () => {
                const imgData = reader.result;
                setImage(imgData);
                onUpload(label, file.name, imgData);
            });
            reader.readAsDataURL(file);
        }
        // pass the data in fileContents to the top level
    };

    const handleRemoveImage = (e) => {
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
                            <IconButton color='primary' onClick={handleRemoveImage}>
                                <CloseIcon/>
                            </IconButton>
                        </label>
                    </Stack>
                    <img width={'300px'} src={image} alt='' />
                </Stack>

            </Stack>
        </>
    );
}