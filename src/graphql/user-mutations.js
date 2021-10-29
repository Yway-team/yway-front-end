import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($idToken: String!) {
        login(idToken: $idToken) {
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
