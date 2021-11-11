import { Grid } from "@mui/material";
import { CreateQuestionCard } from ".";
import { questionsVar } from "../screens/CreateQuizScreen";
import React from 'react';

export default function CreateQuestionCardList({ setQuestions }) {
    return (
        <Grid container item direction={"column"} >
            {questionsVar().map(({ id }, index) => <CreateQuestionCard key={id} questionIndex={index} setQuestions={setQuestions} />)}
        </Grid>
    );
}
