import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($idToken: String!) {
        login(idToken: $idToken) {
            _id
            googleId
            number
        }
    }
`;

export const LOGOUT = gql`
    mutation Logout($_id: String!) {
        logout(_id: $_id)
    }
`;

export const INCREMENT_NUMBER = gql`
    mutation IncrementNumber($_id: String!) {
        incrementNumber(_id: $_id)
    }
`;

export const DECREMENT_NUMBER = gql`
    mutation DecrementNumber($_id: String!) {
        decrementNumber(_id: $_id)
    }
`;
