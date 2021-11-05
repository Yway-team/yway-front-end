const { gql } = require('apollo-server');

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
