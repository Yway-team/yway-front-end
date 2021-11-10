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

export const SAVE_QUIZ_AS_DRAFT = gql`
    mutation SaveQuizAsDraft($draft: DraftInput!) {
        # returns _id of draft if successful, else null
        saveQuizAsDraft(draft: $draft)
    }
    # input DraftInput {
    #     _id: String
    #     questions: [QuestionInput]
    #     tags: [String]
    #     title: String
    #     shuffleQuestions: Boolean
    #     shuffleAnswers: Boolean
    #     timeToAnswer: Int
    #     bannerImg: String
    #     color: String
    #     createdAt: String
    #     description: String
    #     platformName: String
    #     thumbnailImg: String
    # }
`;
