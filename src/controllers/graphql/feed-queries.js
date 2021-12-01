import { gql } from '@apollo/client';

export const SEARCH = gql`
    query Search($searchString: String!, $filter: String) {
        search(searchString: $searchString, filter: $filter) {
            platforms {
                _id
                description
                favorites
                numQuizzes
                thumbnailImg
                title
            }
            quizzes {
                _id
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
            users {
                _id
                avatar
                username
            }
            tags
        }
    }
`;
