import {Button, Chip, Container, Grid, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import Stack from "@mui/material/Stack";

function TagsInput({}) {
    const [tags, setTags] = useState([])
    const [newTag, setNewTag] = useState('')

    const handleAddTag = () => {
        if (newTag === '' || tags.includes(newTag)) {
            return
        }
        setTags((tags) => tags.concat(newTag));
        setNewTag('');
        console.log(tags)
    }

    const handleDeleteTag = tagToDelete => () => {
        setTags(tags => [tags.filter((tag) => tag !== tagToDelete)]);
        console.log(tags)
    }

    return (
        <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} alignItems={'center'} >
                <Typography sx={{width: 250}}>
                    Tags
                </Typography>
                <TextField value={newTag} onChange={e => setNewTag(e.target.value)} variant='outlined'
                           style={{width: 300, marginRight: 52}}>
                </TextField>
                <Button onClick={handleAddTag} variant={"contained"}>
                    ADD TAG
                </Button>
            </Stack>
            <Grid container direction={'row'} spacing={2}>
                <Grid item>
                    {tags.map((data, index) => <Chip key={data} label={data} />)}
                </Grid>
            </Grid>
        </Stack>
    )
}

export default TagsInput;