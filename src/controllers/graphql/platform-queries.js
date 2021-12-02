import { gql } from '@apollo/client';

export const GET_PLATFORM_HIGHLIGHTS = gql`
    query GetPlatformHighlights($howMany: Int!) {
        getPlatformHighlights(howMany: $howMany) {
            _id
            description
            favorites
            numQuizzes
            thumbnailImg
            title
        }
    }
`;

export const GET_PLATFORM_SUMMARY = gql`
    query GetPlatformSummary($title: String!) {
        getPlatformSummary(title: $title) {
            _id
            bannerImg
            color
            description
            favorites
            moderator
            numQuizzes
            numQuestions
            quizzesInfo {
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
            tags
            thumbnailImg
        }
    }
`;

export const GET_PLATFORM_THUMBNAIL = gql`
    query GetPlatformThumbnail($title: String!) {
        getPlatformThumbnail(title: $title)
    }
`;

export const GET_PLATFORM_SETTINGS = gql`
    query GetPlatformSettings($title: String!) {
        getPlatformSettings(title: $title) {
            bannerImg
            color
            minCreatorPoints
            onlyModSubmissions
            tags
            thumbnailImg
            title
        }
    }
`;
