import { gql } from '@apollo/client';

export const GET_USER = gql`
    query GetUser($_id: String!) {
        getUser(_id: $_id) {
            _id
            googleId
            username
            bio
            avatar
            privacySettings
            playPoints
            creatorPoints
            moderator
            friends
            favorites
            quizzes
            platforms
            achievements {
              name
            }
            drafts {
              name
            }
            history {
              name
            }
            notifications {
              name
            }
        }
    }
`;

export const GET_USER_PUBLIC_INFO = gql`
    query GetUserPublicInfo($_id: String!) {
        getUserPublicInfo(_id: $_id) {
            _id
            username
            avatar
            privacySettings
        }
    }
`;

export const GET_USER_INFO = gql`
    query GetUserInfo($userId: String!) {
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
