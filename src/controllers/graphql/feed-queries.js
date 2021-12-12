import { gql } from '@apollo/client';

export const SEARCH = gql`
    query Search($searchString: String!, $filter: String, $skip: Int) {
        search(searchString: $searchString, filter: $filter, skip: $skip) {
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

export const SEARCH_PLATFORM_TITLES = gql`
    query SearchPlatformTitles($searchString: String!) {
        searchPlatformTitles(searchString: $searchString)
    }
`;
