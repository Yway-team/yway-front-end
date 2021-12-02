import {Box, Button, Chip, TextField, Typography} from "@mui/material";
import React from "react";
import Stack from "@mui/material/Stack";

function TagsInput({tags, handleAddTag, handleDeleteTag, newTag, onNewTagChange}) {

    const handleEnterKeyPressed = (e) => {
        if(e.keyCode === 13)
            handleAddTag();
    }

    return (
        <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} alignItems={'center'}>
                <Typography sx={{width: 250}}>
                    Tags
                </Typography>
                <TextField value={newTag} onChange={onNewTagChange} onKeyDown={handleEnterKeyPressed} variant='outlined'
                           style={{width: 336, marginRight: 16}}>
                </TextField>
                <Button onClick={handleAddTag} variant={"contained"}>
                    ADD TAG
                </Button>
            </Stack>
            <Box direction={'row'} m={1} sx={{maxWidth: '1050px'}}>
                {tags.map((data, index) => <Chip sx={{marginRight: 1, marginBottom: 1}} key={data} label={'#'.concat(data)}
                                                 color={"primary"} variant={"outlined"}
                                                 onDelete={handleDeleteTag(data)}/>)}
            </Box>
        </Stack>
    )
}

export default TagsInput;