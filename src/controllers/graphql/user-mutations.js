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
              description
              type
              timestamp
            }
            playPoints
            username
        }
    }
`;
