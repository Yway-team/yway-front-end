import { gql } from '@apollo/client';

export const GET_QUIZ_INFO = gql`
    query GetQuizInfo($quizId: ID!) {
        getQuizInfo(quizId: $quizId) {
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
