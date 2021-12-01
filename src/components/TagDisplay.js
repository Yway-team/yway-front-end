import {Box, Button, Chip, TextField, Typography} from "@mui/material";
import React from "react";
import Stack from "@mui/material/Stack";

function TagsInput({tags}) {

    return (
        <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} alignItems={'center'}>
                <Typography sx={{width: 250}}>
                    Tags
                </Typography>
            </Stack>
            <Box direction={'row'} m={1} sx={{maxWidth: '1050px'}}>
                {tags.map((data, index) => <Chip sx={{marginRight: 1, marginBottom: 1}} key={data} label={'#'.concat(data)}
                                                 color={"primary"} variant={"outlined"}/>)}
            </Box>
        </Stack>
    )
}

export default TagsInput;