import { useReactiveVar } from "@apollo/client";
import {
    Autocomplete,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    FormLabel,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import { formErrorsVar, quizDetailsVar } from "../../screens/CreateQuizScreen";
import React, { Fragment, useState } from "react";
import { ColorPicker, ImageUpload, LabelTextField } from "..";
import TagsInput from "../TagsInput";
import Stack from "@mui/material/Stack";
import { SEARCH_PLATFORM_TITLES } from "../../controllers/graphql/feed-queries";
import { useQuery } from "@apollo/client";

export default function CreateQuizForms({ numQuestions, updateNumQuestions, handleUpdateNumQuestions, edit }) {
    const quizDetails = useReactiveVar(quizDetailsVar);
    const formErrors = useReactiveVar(formErrorsVar);
    const [numQuestionsText, setNumQuestionsText] = useState(numQuestions);
    const [previousUpdateNumQuestions, setPreviousUpdateNumQuestions] = useState(updateNumQuestions);
    const bannerImgLabel = 'Banner Image';
    const thumbnailImgLabel = 'Thumbnail Image';
    const [newTag, setNewTag] = useState('')
    const MAX_QUESTIONS = 100;
    if (updateNumQuestions !== previousUpdateNumQuestions) {
        setNumQuestionsText(numQuestions);
        setPreviousUpdateNumQuestions(!previousUpdateNumQuestions);
    }

    const handleSetColor = (color) => {
        let details = { ...quizDetails };
        details.color = color.hex;
        quizDetailsVar(details);
    };

    const handleImageUpload = (name, filename, data) => {
        const newQuizDetails = { ...quizDetails };
        if (name === bannerImgLabel) {
            newQuizDetails.bannerImgData = data;
            newQuizDetails.bannerImgName = filename;
            console.log(newQuizDetails);
            quizDetailsVar(newQuizDetails);
        } else if (name === thumbnailImgLabel) {
            newQuizDetails.thumbnailImgData = data;
            newQuizDetails.thumbnailImgName = filename;
            quizDetailsVar(newQuizDetails);
        } else {
            console.error(`CreateQuizForms.handleImageUpload: argument 'name' must be one of '${bannerImgLabel}' or '${thumbnailImgLabel}'`)
        }
    };

    const handleRemoveImage = (name) => {
        const newQuizDetails = { ...quizDetails };
        if (name === bannerImgLabel) {
            newQuizDetails.bannerImgData = '';
            newQuizDetails.bannerImgName = null;
            console.log(newQuizDetails);
            quizDetailsVar(newQuizDetails);
        } else if (name === thumbnailImgLabel) {
            newQuizDetails.thumbnailImgData = '';
            newQuizDetails.thumbnailImgName = null;
            quizDetailsVar(newQuizDetails);
        } else {
            console.error(`CreateQuizForms.handleRemoveImage: argument 'name' must be one of '${bannerImgLabel}' or '${thumbnailImgLabel}'`)
        }
    }

    const handleAddTag = () => {
        if (newTag === '' || quizDetails.tags.includes(newTag)) {
            return
        }
        let details = { ...quizDetails };
        details.tags = details.tags.concat(newTag);
        quizDetailsVar(details);
        setNewTag('');
    }

    const handleDeleteTag = tagToDelete => () => {
        let details = { ...quizDetails };
        details.tags = details.tags.filter((tag) => tag !== tagToDelete);
        quizDetailsVar(details);
    }
    const onNewTagChange = (tag) => {
        setNewTag(tag);
    }

    return (<>
        <Grid item>
            <FormLabel style={{ fontWeight: '700', fontSize: 16, color: 'common.black' }}>
                Quiz Details
            </FormLabel>
        </Grid>

        <Grid item>
            {!edit ? <PlatformSearchTextField label={"Platform"} value={quizDetails.platformName}
                onChange={e => {
                    let details = { ...quizDetails };
                    details.platformName = e.target.value;
                    quizDetailsVar(details);
                }} /> : <Fragment />}

        </Grid>

        <Grid item>
            <LabelTextField label={"Quiz Title"} value={quizDetails.title} error={!formErrors.titleValid}
                helperText={formErrors.errorMsgs.title}
                onChange={e => {
                    let details = { ...quizDetails };
                    details.title = e.target.value;
                    quizDetailsVar(details);
                }} />
        </Grid>
        <Grid item>
            <LabelTextField name="description" label={"Description (optional)"} value={quizDetails.description}
                onChange={e => {
                    let details = { ...quizDetails };
                    details.description = e.target.value;
                    quizDetailsVar(details);
                }}
                multiline={true}
                variant={"outlined"} />
        </Grid>
        <Grid item>
            <TagsInput tags={quizDetails.tags} handleAddTag={handleAddTag} handleDeleteTag={handleDeleteTag}
                newTag={newTag} onNewTagChange={e => onNewTagChange(e.target.value)}>
            </TagsInput>
        </Grid>
        <Grid item>
            <ImageUpload onUpload={handleImageUpload} label={bannerImgLabel} onRemove={handleRemoveImage}
                /*savedImg={quizDetails.bannerImg}*/ />
        </Grid>
        {/*<Grid item>*/}
        {/*    <ImageUpload onUpload={handleImageUpload} label={thumbnailImgLabel} onRemove={handleRemoveImage}/>*/}
        {/*</Grid>*/}
        <Grid item marginTop={4}>
            <FormLabel style={{
                fontWeight: '700', fontSize: 16, color: 'common.black'
            }}>
                Questions
            </FormLabel>
        </Grid>
        {!edit ? <><Grid item> <LabelTextField label={"Number of Questions"}
            value={numQuestionsText}
            error={formErrors.numQuestionsValid}
            helperText={formErrors.errorMsgs.numQuestions}
            onChange={e => {
                const value = Number(e.target.value);
                if (value >= 0 && value <= MAX_QUESTIONS) {
                    setNumQuestionsText(value);
                }
            }}
            onBlur={() => handleUpdateNumQuestions(numQuestionsText)}
            type={"number"} /> </Grid> <Grid item>
                <LabelTextField name="timeToAnswer" label={"Time to answer (seconds)"} type={"number"}
                    value={quizDetails.timeToAnswer}
                    error={!formErrors.timeToAnswerValid} helperText={formErrors.errorMsgs.timeToAnswer}
                    onChange={e => {
                        const value = Number(e.target.value);
                        if (value >= 1) {
                            let details = { ...quizDetails };
                            details.timeToAnswer = Number(e.target.value);
                            quizDetailsVar(details);
                        }
                    }
                    }
                    onBlur={e => {
                        const value = Number(e.target.value);
                        if (value >= 1) {
                            let details = { ...quizDetails };
                            details.timeToAnswer = Number(e.target.value);
                            quizDetailsVar(details);
                        } else {
                            let details = { ...quizDetails };
                            details.timeToAnswer = 10;
                            quizDetailsVar(details);
                        }
                    }} />
            </Grid>
            <Grid item>
                <FormControlLabel label="Shuffle Questions" labelPlacement="start"
                    style={{
                        padding: 0,
                        marginLeft: 0,
                        width: 280,
                        justifyContent: "space-between"
                    }}
                    checked={quizDetails.shuffleQuestions}
                    control={<Checkbox onChange={e => {
                        let details = { ...quizDetails };
                        details.shuffleQuestions = e.target.checked;
                        quizDetailsVar(details);
                    }} />}>
                </FormControlLabel>
            </Grid>
            <Grid item>
                <FormControlLabel label="Shuffle Answer Options" labelPlacement="start"
                    style={{
                        padding: 0,
                        marginLeft: 0,
                        width: 280,
                        justifyContent: "space-between"
                    }}
                    checked={quizDetails.shuffleAnswers}
                    control={<Checkbox onChange={e => {
                        let details = { ...quizDetails };
                        details.shuffleAnswers = e.target.checked;
                        quizDetailsVar(details);
                    }} />}>
                </FormControlLabel>
            </Grid></> : <Fragment />}


        <Grid item>
            <ColorPicker label={"Color Style"} colorState={quizDetails.color}
                onChangeComplete={color => handleSetColor(color)} />
        </Grid>
    </>);
}



function PlatformSearchTextField({ defaultValue,
    value,
    onBlur,
    label,
    onChange,
    variant,
    type,
    multiline,
    placeholder
}) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [query, setQuery] = useState(value);

    const { data, refetch } = useQuery(SEARCH_PLATFORM_TITLES, { skip: true });


    if (data) {
        console.log(data);
    }

    React.useEffect(() => {
        let active = true;


        if (query === '') {
            return undefined;
        }

        refetch({ searchString: query });

        let timeOutId;
        (async () => {
            timeOutId = setTimeout(() => {
                console.log('search is called');
                refetch({ searchString: query });

            }, 200);
            if (active) {
                setOptions([...topFilms]);
            }
        })()

        return () => {
            active = false;
            clearTimeout(timeOutId);
        };
    }, [query]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    React.useEffect(() => {
        console.log(data);
    }, [data]);


    return (
        <Stack direction={'row'} alignItems={'baseline'}>
            <Typography sx={{ width: 250 }}>
                {label}
            </Typography>
            <Autocomplete
                id="platform search"
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                isOptionEqualToValue={(option, value) => option.title === value.title}
                getOptionLabel={(option) => option.title}
                options={options}
                renderInput={(params) => (
                    <TextField {...params} defaultValue={defaultValue} value={value}
                        onChange={(value) => {
                            // onChange(value);
                            setQuery(value);
                        }}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        variant={variant || 'standard'}
                        style={{ width: 450 }} type={type || 'text'} multiline={multiline || false}>
                    </TextField>
                )}
            />
        </Stack>
    );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
];

