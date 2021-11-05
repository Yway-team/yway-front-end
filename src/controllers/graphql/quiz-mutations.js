import { gql } from '@apollo/client';

export const CREATE_AND_PUBLISH_QUIZ = gql`
    mutation CreateAndPublishQuiz($quiz: QuizInput!) {
        createAndPublishQuiz(quiz: $quiz) {
            _id
            attempts
            averageScore
            bannerImg
            color
            description
            owner
            platform
            questions
            rating
            ratingCount
            tags
            title
            shuffleQuestions
            shuffleAnswers
            thumbnailImg
            timeToAnswer
        }
    }
`;
