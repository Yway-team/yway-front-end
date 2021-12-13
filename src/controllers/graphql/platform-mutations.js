import { gql } from '@apollo/client';

export const CREATE_PLATFORM = gql`
    mutation CreatePlatform($platform: PlatformInput!) {
        # input PlatformInput {
        #     bannerImg: String
        #     color: String
        #     description: String
        #     minCreatorPoints: Int
        #     onlyModSubmissions: Boolean
        #     thumbnailImg: String
        #     tags: [String]
        #     title: String!
        # }
        createPlatform(platform: $platform) {
            achievement {
                creatorPointValue
                description
                icon
                lastEarned
                name
            }
            creatorPoints
            platformId
        }
    }
`;

export const DELETE_PLATFORM = gql`
    mutation DeletePlatform($title: String!) {
        deletePlatform(title: $title)
    }
`;

export const UPDATE_PLATFORM_SETTINGS = gql`
    mutation UpdatePlatformSettings($platformSettings: PlatformSettingsInput!) {
        updatePlatformSettings(platformSettings: $platformSettings) {
            bannerImg
            color
            description
            minCreatorPoints
            onlyModSubmissions
            tags
            thumbnailImg
            title
            _id
        }
    }
`;

export const REMOVE_QUIZ_FROM_PLATFORM = gql`
    mutation RemoveQuizFromPlatform($platformId: ID!, $quizId: ID!) {
        removeQuizFromPlatform(platformId: $platformId, quizId: $quizId)
    }
`;
