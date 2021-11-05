import {Button, Card, CardContent, Grid, IconButton, Stack, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import {useTheme} from "@mui/material/styles";
import React, {useState} from "react";

    // index: Int
    // answerOptions: [String]
    // correctAnswer: String
    // question: String


export default function CreateQuestionCard({index, question, answerOptions, correctAnswer}) {
    const theme = useTheme();
    const [options, setOptions] = useState([]);

    const handleAddOption = () => {
        setOptions(options => [...options, `${options.length}`])
        console.log(options);
    }

    const handleRemoveQuestion = (e) => {
        const name = e.target.getAttribute("name");
        setOptions(options.filter(item => item.name !== name));
        console.log(options);
    };

    return (
        <Card variant="outlined" sx={{maxWidth: 700, m: 2, borderColor: theme.palette.primary.main, borderRadius: 2}}>
            <Grid container justifyContent="space-between">
                <Grid item container direction="row" sx={{
                    backgroundColor: theme.palette.primary.main,
                    height: "60px",
                    width: "60px",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: "0px 0px 55px 0px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)"
                }}
                >
                    <Grid
                        container
                        item
                        xs={12}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            sx={{
                                fontWeight: "700",
                                fontSize: 20,
                                color: theme.palette.common.white
                            }}
                        >
                            {index}
                        </Typography>
                    </Grid>
                </Grid>
                <IconButton aria-label="delete question" sx={{color: theme.palette.primary.main}}>
                    <CloseIcon/>
                </IconButton>
            </Grid>
            <CardContent>
                <Grid padding={2}>
                    <TextField label="Question" variant="standard" fullWidth/>
                    {options.map((data, index) => <TextField key={index} {...data} label="Option" variant="standard" fullWidth/>)}
                    <Stack direction="row" justifyContent="space-between" sx={{paddingTop: 4}}>
                        <Button variant={"outlined"} endIcon={<AddCircleOutlinedIcon/>} onClick={handleAddOption}> Add Option</Button>
                        <IconButton aria-label="copy question" sx={{color: theme.palette.primary.main}}>
                            <ContentCopyIcon/>
                        </IconButton>
                    </Stack>
                </Grid>
            </CardContent>
        </Card>
    );
}
