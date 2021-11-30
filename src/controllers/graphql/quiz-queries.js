import { gql } from '@apollo/client';

export const GET_QUIZ_INFO = gql`
    query GetQuizInfo($quizId: ID!) {
        getQuizInfo(quizId: $quizId) {
            bannerImg
            color
            createdAt
            description
            numQuestions
            ownerAvatar
            ownerId
            ownerUsername
            platformId
            platformName
            platformThumbnail
            rating
            title
        }
    }
`;

export const GET_QUIZ_HIGHLIGHTS = gql`
    query GetQuizHighlights($howMany: Int!) {
        getQuizHighlights(howMany: $howMany) {
            _id
            bannerImg
            createdAt
            description
            numQuestions
            ownerAvatar
            ownerId
            ownerUsername
            platformId
            platformName
            platformThumbnail
            rating
            title
        }
    }
`;

export const GET_QUESTION_LIST = gql`
    query GetQuestionList($quizId: ID!) {
        getQuestionList(quizId: $quizId)
    }
`;

export const GET_QUESTION_INFO = gql`
    query GetQuestionInfo($questionId: ID!) {
        getQuestionInfo(questionId: $questionId) {
            _id
            answerOptions
            correctAnswer
            description
        }
    }
`;
