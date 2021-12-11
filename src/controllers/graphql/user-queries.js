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
            friendStatus
            friends
            quizzes
            platforms
            achievements {
                creatorPointValue
                description
                playPointValue
                createdAt
                type
            }
            history {
                description
                createdAt
                type
            }
        }
    }
`;

export const GET_DRAFT = gql`
    query GetDraft($draftId: ID!) {
        getDraft(draftId: $draftId) {
            _id
            questions {
                answerOptions
                correctAnswerIndex
                description
            }
            tags
            title
            shuffleQuestions
            shuffleAnswers
            timeToAnswer
            bannerImg
            color
            updatedAt
            description
            platformName
            thumbnailImg
        }
    }
`;

export const GET_DRAFTS_INFO = gql`
    query GetDraftsInfo {
        getDraftsInfo {
            _id
            bannerImg
            updatedAt
            description
            numQuestions
            tags
            title
            timeToAnswer
            platformName
        }
    }
`;

export const GET_USER_QUIZZES_INFO = gql`
    query GetUserQuizzesInfo($userId: ID) {
        getUserQuizzesInfo(userId: $userId) {
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

export const GET_USER_PLATFORMS_INFO = gql`
    query GetUserPlatformsInfo($userId: ID) {
        getUserPlatformsInfo(userId: $userId) {
            _id
            description
            favorites
            numQuizzes
            thumbnailImg
            title
        }
    }
`;

export const GET_USER_FRIENDS_INFO = gql`
    query GetUserFriendsInfo($userId: ID!) {
        getUserFriendsInfo(userId: $userId) {
            friendRequestsInfo {
                _id
                avatar
                username
            }
            friendsInfo {
                _id
                avatar
                username
            }
        }
    }
`;

export const GET_PROFILE_OVERVIEW = gql`
    query GetProfileOverview($userId: ID!) {
        getProfileOverview(userId: $userId) {
            creatorPoints
            playPoints
            achievements {
                createdAt
                creatorPointValue
                description
                playPointValue
                type
            }
            friendsInfo {
                _id
                avatar
                username
            }
            history {
                createdAt
                description
                type
            }
            platformsInfo {
                _id
                description
                favorites
                numQuizzes
                thumbnailImg
                title
            }
            quizzesInfo {
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
        }
    }
`;
