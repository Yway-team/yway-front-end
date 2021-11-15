import { gql } from '@apollo/client';

export const GET_USER_PUBLIC_INFO = gql`
    query GetUserPublicInfo($userId: ID!) {
        getUserPublicInfo(userId: $userId) {
            _id
            username
            avatar
            privacySettings
        }
    }
`;

export const GET_USER_INFO = gql`
    query GetUserInfo($userId: ID!) {
        getUserInfo(userId: $userId) {
            _id
            username
            bio
            avatar
            privacySettings
            playPoints
            creatorPoints
            moderator
            friends
            quizzes
            platforms
            achievements {
                creatorPointValue
                description
                playPointValue
                timestamp
                type
            }
            history {
                description
                timestamp
                type
            }
        }
    }
`;

export const GET_DRAFTS_INFO = gql`
    query GetDraftsInfo {
        getDraftsInfo {
            _id
            bannerImg
            createdAt
            description
            numQuestions
            tags
            title
            timeToAnswer
            platformName
        }
    }
`;
