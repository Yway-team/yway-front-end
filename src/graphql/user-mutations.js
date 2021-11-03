import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($idToken: String!) {
        login(idToken: $idToken) {
            _id
            avatar
            creatorPoints
            favorites
            googleId
            notifications {
              name
              type
              timestamp
            }
            playPoints
            username
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($_id: String!, $updates: UpdateUserInput!) {
        updateUser(_id: $_id, updates: $updates) {
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
